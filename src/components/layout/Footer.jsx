
const Footer = () => {
    return (
        <footer
            className="px-6 md:px-10 py-8 mt-auto"
            style={{
                borderTop: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg)',
            }}
        >
            <div
                className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4"
            >
                <p
                    style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '11px',
                        letterSpacing: '0.08em',
                        color: 'var(--color-muted)',
                    }}
                >
                    &copy; {new Date().getFullYear()} Synapse Calyx
                </p>

                <div className="flex gap-6">
                    {[
                        { name: 'Instagram', url: 'https://www.instagram.com/synapse.cx' },
                        { name: 'LinkedIn', url: 'https://www.linkedin.com/company/synapse-calyx/' },
                        { name: 'Behance', url: 'http://behance.net/teamsynapse' },
                    ].map((s) => (
                        <a
                            key={s.name}
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: '11px',
                                letterSpacing: '0.05em',
                                color: 'var(--color-muted)',
                                textDecoration: 'none',
                                transition: 'color 0.2s ease',
                            }}
                            onMouseEnter={(e) => { e.target.style.color = 'var(--color-ink)'; }}
                            onMouseLeave={(e) => { e.target.style.color = 'var(--color-muted)'; }}
                        >
                            {s.name}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
