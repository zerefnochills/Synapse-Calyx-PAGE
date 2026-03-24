import { useParams, Navigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { FEATURED_POST, BLOG_CARDS } from '../data/BlogData';
import s from './ArticlePage.module.css';

const ArticlePage = () => {
    const { slug } = useParams();
    
    const article = [FEATURED_POST, ...BLOG_CARDS].find(p => p.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!article) {
        return <Navigate to="/" replace />;
    }

    // A simple parser for the content blocks
    const paragraphs = article.content.split('\n\n').filter(p => p.trim() !== '');

    return (
        <article className={s.articlePage}>
            <div className={s.container}>
                <Link to="/" className={s.backLink}>← Back to Home</Link>
                
                <header className={s.header}>
                    <div className={s.meta}>
                        <span>{article.date}</span>
                        <span className={s.dot}>•</span>
                        <span>{article.readTime}</span>
                        {article.label && (
                            <>
                                <span className={s.dot}>•</span>
                                <span className={s.label} style={{ color: article.labelColor || '#fff' }}>
                                    {article.label}
                                </span>
                            </>
                        )}
                    </div>
                    
                    <h1 className={s.title}>{article.title}</h1>
                    
                    <div className={s.tags}>
                        {article.tags.map(tag => (
                            <span key={tag} className={s.tag}>{tag}</span>
                        ))}
                    </div>
                </header>

                <div className={s.divider} />

                <div className={s.content}>
                    <p className={s.excerpt}>{article.excerpt}</p>
                    {paragraphs.map((para, idx) => {
                        if (para.startsWith('───')) {
                            return <h3 key={idx} className={s.sectionTitle}>{para.replace('───', '').trim()}</h3>;
                        }
                        if (para.match(/^[-*]\s/) || para.match(/^\d+\.\s/)) {
                            // Render as list conceptually, using pre-wrap for now
                            return <div key={idx} className={s.listBlock}>{para}</div>;
                        }
                        return <p key={idx} className={s.paragraph}>{para}</p>;
                    })}
                </div>
                
                <footer className={s.footer}>
                    <div className={s.divider} />
                    <div className={s.ctaContainer}>
                        <h3 className={s.ctaTitle}>Ready to build something real?</h3>
                        <Link to="/order" className={s.ctaButton}>Start a Project</Link>
                    </div>
                </footer>
            </div>
        </article>
    );
};

export default ArticlePage;
