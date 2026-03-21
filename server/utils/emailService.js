// ============================================
// EMAIL SERVICE — Nodemailer Notifications
// ============================================

const nodemailer = require('nodemailer');

/**
 * Create reusable SMTP transporter.
 * Returns null if SMTP is not configured (dev fallback to console logging).
 */
const createTransporter = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn('⚠ SMTP not configured — emails will be logged to console instead.');
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT) || 587,
    secure: parseInt(SMTP_PORT) === 465, // true for 465, false for other ports
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
};

let transporter = null;

/**
 * Get or initialize the transporter (lazy init)
 */
const getTransporter = () => {
  if (!transporter) {
    transporter = createTransporter();
  }
  return transporter;
};

/**
 * Send email notification to admin when a new order is received.
 */
const sendNewOrderNotification = async (order) => {
  const transport = getTransporter();
  const adminEmail = process.env.ADMIN_EMAIL;

  const emailContent = {
    subject: `🚀 New Order: ${order.serviceType} — ${order.name}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 640px; margin: 0 auto; background: #0a0a0a; color: #e0e0e0; border-radius: 12px; overflow: hidden;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 32px; text-align: center;">
          <h1 style="margin: 0; color: #fff; font-size: 24px; font-weight: 700;">New Client Order</h1>
          <p style="margin: 8px 0 0; color: rgba(255,255,255,0.85); font-size: 14px;">Synapse Calyx</p>
        </div>

        <!-- Body -->
        <div style="padding: 32px;">
          
          <!-- Client Info -->
          <h2 style="color: #a78bfa; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; border-bottom: 1px solid #222; padding-bottom: 8px;">Client Information</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr><td style="padding: 8px 0; color: #888; width: 120px;">Name</td><td style="padding: 8px 0; color: #fff; font-weight: 600;">${order.name}</td></tr>
            <tr><td style="padding: 8px 0; color: #888;">Email</td><td style="padding: 8px 0;"><a href="mailto:${order.email}" style="color: #818cf8;">${order.email}</a></td></tr>
            ${order.phone ? `<tr><td style="padding: 8px 0; color: #888;">Phone</td><td style="padding: 8px 0; color: #fff;">${order.phone}</td></tr>` : ''}
            ${order.company ? `<tr><td style="padding: 8px 0; color: #888;">Company</td><td style="padding: 8px 0; color: #fff;">${order.company}</td></tr>` : ''}
          </table>

          <!-- Project Info -->
          <h2 style="color: #a78bfa; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; border-bottom: 1px solid #222; padding-bottom: 8px;">Project Details</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr><td style="padding: 8px 0; color: #888; width: 120px;">Service</td><td style="padding: 8px 0;"><span style="background: #6366f1; color: #fff; padding: 4px 12px; border-radius: 20px; font-size: 13px;">${order.serviceType}</span></td></tr>
            ${order.budget ? `<tr><td style="padding: 8px 0; color: #888;">Budget</td><td style="padding: 8px 0; color: #22c55e; font-weight: 600;">${order.budget}</td></tr>` : ''}
            ${order.attachments?.length ? `<tr><td style="padding: 8px 0; color: #888;">Files</td><td style="padding: 8px 0; color: #fff;">${order.attachments.length} attachment(s)</td></tr>` : ''}
          </table>

          <!-- Message -->
          <h2 style="color: #a78bfa; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; border-bottom: 1px solid #222; padding-bottom: 8px;">Message</h2>
          <div style="background: #111; border-left: 3px solid #6366f1; padding: 16px; border-radius: 4px; color: #ccc; line-height: 1.6; white-space: pre-wrap;">${order.message}</div>

          <!-- Order ID -->
          <div style="margin-top: 32px; padding: 16px; background: #111; border-radius: 8px; text-align: center;">
            <span style="color: #888; font-size: 12px;">Order ID</span><br/>
            <span style="color: #fff; font-size: 18px; font-weight: 700; font-family: monospace;">${order.orderId || order._id}</span>
          </div>

        </div>

        <!-- Footer -->
        <div style="padding: 16px 32px; background: #060606; text-align: center;">
          <p style="margin: 0; color: #555; font-size: 12px;">Synapse Calyx — Order Management System</p>
        </div>
      </div>
    `,
  };

  // If no SMTP configured, log to console
  if (!transport) {
    console.log('\n📧 Email Notification (console fallback):');
    console.log(`   To: ${adminEmail || 'ADMIN_EMAIL not set'}`);
    console.log(`   Subject: ${emailContent.subject}`);
    console.log(`   Order from: ${order.name} <${order.email}>`);
    console.log(`   Service: ${order.serviceType}`);
    console.log(`   Message: ${order.message.substring(0, 100)}...`);
    console.log('');
    return;
  }

  try {
    await transport.sendMail({
      from: `"Synapse Calyx" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      ...emailContent,
    });
    console.log(`✓ Admin notification sent to ${adminEmail}`);
  } catch (err) {
    console.error('✗ Failed to send admin email:', err.message);
    // Don't throw — email failure shouldn't block the order submission
  }
};

/**
 * Send order confirmation email to the client.
 */
const sendOrderConfirmation = async (order) => {
  const transport = getTransporter();

  const emailContent = {
    subject: `We received your project request — Synapse Calyx`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 640px; margin: 0 auto; background: #0a0a0a; color: #e0e0e0; border-radius: 12px; overflow: hidden;">
        
        <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 32px; text-align: center;">
          <h1 style="margin: 0; color: #fff; font-size: 24px; font-weight: 700;">Thank You, ${order.name}!</h1>
          <p style="margin: 8px 0 0; color: rgba(255,255,255,0.85); font-size: 14px;">We've received your project request</p>
        </div>

        <div style="padding: 32px;">
          <p style="color: #ccc; line-height: 1.6; margin-bottom: 24px;">
            Thanks for reaching out to Synapse Calyx. We've received your <strong style="color: #a78bfa;">${order.serviceType}</strong> project request and our team will review it shortly.
          </p>

          <div style="background: #111; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
            <p style="margin: 0 0 8px; color: #888; font-size: 13px;">Your Reference ID</p>
            <p style="margin: 0; color: #fff; font-size: 24px; font-weight: 700; font-family: monospace;">${order.orderId || order._id}</p>
          </div>

          <p style="color: #888; font-size: 14px; line-height: 1.6;">
            We typically respond within <strong style="color: #e0e0e0;">24-48 hours</strong>. If your project is urgent, feel free to reply to this email.
          </p>
        </div>

        <div style="padding: 16px 32px; background: #060606; text-align: center;">
          <p style="margin: 0; color: #555; font-size: 12px;">Synapse Calyx — Digital Solutions Agency</p>
        </div>
      </div>
    `,
  };

  if (!transport) {
    console.log(`📧 Client confirmation (console fallback): → ${order.email}`);
    return;
  }

  try {
    await transport.sendMail({
      from: `"Synapse Calyx" <${process.env.SMTP_USER}>`,
      to: order.email,
      ...emailContent,
    });
    console.log(`✓ Confirmation email sent to ${order.email}`);
  } catch (err) {
    console.error('✗ Failed to send client confirmation:', err.message);
  }
};

module.exports = { sendNewOrderNotification, sendOrderConfirmation };
