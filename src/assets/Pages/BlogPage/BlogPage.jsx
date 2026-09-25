import { useMemo, useState } from "react";
import { useBlogPosts } from "../../hooks/useSupabaseData.js";
import "./BlogPage.css";

function formatDate(isoString) {
    if (!isoString) {
        return "";
    }

    return new Date(isoString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

function BlogPage() {
    const { posts: blogData, loading, error } = useBlogPosts();

    const categories = useMemo(() => {
        const unique = new Set(blogData.map((post) => post.category));
        return ["All", ...unique];
    }, [blogData]);

    const [activeCategory, setActiveCategory] = useState("All");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [selectedBlogId, setSelectedBlogId] = useState(null);

    const filteredBlogs = useMemo(() => {
        if (activeCategory === "All") {
            return blogData;
        }

        return blogData.filter((post) => post.category === activeCategory);
    }, [activeCategory, blogData]);

    const selectedBlog = useMemo(() => {
        return (
            filteredBlogs.find((post) => post.id === selectedBlogId) ||
            filteredBlogs[0] ||
            null
        );
    }, [filteredBlogs, selectedBlogId]);

    function handleCategoryClick(category) {
        setActiveCategory(category);
    }

    function handleSelectBlog(id) {
        setSelectedBlogId(id);
    }

    function toggleSidebar() {
        setIsSidebarOpen((prev) => !prev);
    }

    function renderContentBlock(block, index) {
        switch (block.type) {
            case "heading":
                return (
                    <h2 key={index} className="blogArticleHeading">
                        {block.text}
                    </h2>
                );

            case "quote":
                return (
                    <blockquote key={index} className="blogArticleQuote">
                        {block.text}
                    </blockquote>
                );

            case "list":
                return (
                    <ul key={index} className="blogArticleList">
                        {block.items.map((item, itemIndex) => (
                            <li key={itemIndex}>{item}</li>
                        ))}
                    </ul>
                );

            case "paragraph":
            default:
                return (
                    <p
                        key={index}
                        className={
                            block.style === "lead"
                                ? "blogArticleParagraph blogArticleLead"
                                : "blogArticleParagraph"
                        }
                    >
                        {block.text}
                    </p>
                );
        }
    }

    if (loading) {
        return (
            <section className="blogPage" id="blog-page">
                <div className="blogPageContainer">
                    <p className="blogEmptyState">Loading blog posts...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="blogPage" id="blog-page">
                <div className="blogPageContainer">
                    <p className="blogEmptyState">
                        Something went wrong while loading blog posts.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="blogPage" id="blog-page">

            <div className="blogPageContainer">

                {/* =====================================
                    FILTERS
                ===================================== */}

                <div className="blogPageFilters">
                    <span className="blogFilterLabel">Filter</span>

                    <div className="blogFilterButtons">
                        {categories.map((category) => (
                            <button
                                type="button"
                                key={category}
                                className={`blogFilterButton ${
                                    activeCategory === category ? "active" : ""
                                }`}
                                onClick={() => handleCategoryClick(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div
                    className={`blogPageBody ${
                        !isSidebarOpen ? "sidebarCollapsed" : ""
                    }`}
                >

                    {/* =====================================
                        SIDEBAR — overzicht eerdere posts
                    ===================================== */}

                    <aside className="blogSidebar">

                        <div className="blogSidebarHeader">
                            {isSidebarOpen && <h3>All Posts</h3>}

                            <button
                                type="button"
                                className="blogSidebarToggle"
                                onClick={toggleSidebar}
                                aria-expanded={isSidebarOpen}
                                aria-label={
                                    isSidebarOpen
                                        ? "Collapse blog overview"
                                        : "Expand blog overview"
                                }
                            >
                                {isSidebarOpen ? "−" : "+"}
                            </button>
                        </div>

                        {isSidebarOpen && (
                            <ul className="blogSidebarList">
                                {filteredBlogs.map((post) => {
                                    const isActive =
                                        selectedBlog?.id === post.id;

                                    return (
                                        <li key={post.id}>
                                            <button
                                                type="button"
                                                className={`blogSidebarItem ${
                                                    isActive ? "active" : ""
                                                }`}
                                                onClick={() =>
                                                    handleSelectBlog(post.id)
                                                }
                                            >
                                                <span className="blogSidebarItemTitle">
                                                    {post.title}
                                                </span>

                                                <span className="blogSidebarItemSubtitle">
                                                    {post.subtitle}
                                                </span>
                                            </button>
                                        </li>
                                    );
                                })}

                                {filteredBlogs.length === 0 && (
                                    <li className="blogSidebarEmpty">
                                        No posts in this category yet.
                                    </li>
                                )}
                            </ul>
                        )}

                    </aside>

                    {/* =====================================
                        ARTICLE — geselecteerde blog
                    ===================================== */}

                    <article className="blogArticle">

                        {!selectedBlog && (
                            <p className="blogEmptyState">
                                No blog posts found for this category.
                            </p>
                        )}

                        {selectedBlog && (
                            <>
                                <div className="blogArticleHero">
                                    <img
                                        src={selectedBlog.media?.heroImage}
                                        alt={selectedBlog.title}
                                        className="blogArticleImage"
                                    />

                                    <span className="blogArticleCategoryBadge">
                                        {selectedBlog.category}
                                    </span>
                                </div>

                                <div className="blogArticleHeader">
                                    <span className="blogArticleDate">
                                        {formatDate(selectedBlog.createdAt)}
                                    </span>

                                    <h1 className="blogArticleTitle">
                                        {selectedBlog.title}
                                    </h1>

                                    <p className="blogArticleSubtitle">
                                        {selectedBlog.subtitle}
                                    </p>
                                </div>

                                {selectedBlog.media?.videoUrl && (
                                    <div className="blogArticleVideo">
                                        <video
                                            src={selectedBlog.media.videoUrl}
                                            controls
                                        />
                                    </div>
                                )}

                                <div className="blogArticleContent">
                                    {selectedBlog.content.map(
                                        (block, index) =>
                                            renderContentBlock(block, index)
                                    )}
                                </div>

                                {selectedBlog.links?.length > 0 && (
                                    <div className="blogArticleLinksBlock">
                                        <h4>Related links</h4>

                                        <ul className="blogArticleLinks">
                                            {selectedBlog.links.map(
                                                (link) => (
                                                    <li key={link.url}>
                                                        <a
                                                            href={link.url}
                                                            target={
                                                                link.url.startsWith(
                                                                    "http"
                                                                )
                                                                    ? "_blank"
                                                                    : undefined
                                                            }
                                                            rel="noopener noreferrer"
                                                        >
                                                            {link.label}
                                                        </a>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </>
                        )}

                    </article>

                </div>

            </div>

        </section>
    );
}

export default BlogPage;
