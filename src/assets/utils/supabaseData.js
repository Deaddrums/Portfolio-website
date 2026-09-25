import { supabase } from "./supabaseClient.js";

/* =====================================
   CV  (site_content, id = "cv")
   Wordt als één JSONB-blob opgeslagen, dus geen kolom-mapping nodig.
===================================== */

export async function fetchCvData() {
    const { data, error } = await supabase
        .from("site_content")
        .select("data")
        .eq("id", "cv")
        .single();

    if (error) {
        throw new Error(`Kon CV-data niet ophalen: ${error.message}`);
    }

    return data?.data ?? null;
}

export async function saveCvData(profileData) {
    const { error } = await supabase
        .from("site_content")
        .upsert({ id: "cv", data: profileData, updated_at: new Date().toISOString() });

    if (error) {
        throw new Error(`Kon CV-data niet opslaan: ${error.message}`);
    }
}

/* =====================================
   PORTFOLIO  (portfolio_items)
===================================== */

function mapPortfolioRowToItem(row) {
    return {
        id: row.id,
        slug: row.slug,
        title: row.title,
        subtitle: row.subtitle,
        category: row.category,
        clientId: row.client_id,
        role: row.role,
        type: row.type,
        featured: row.featured,
        published: row.published,
        updatedAt: row.updated_at,
        text: row.text_content,
        whatIDid: row.what_i_did || [],
        tags: row.tags || [],
        links: row.links || { url: "" },
        media: row.media || { heroImage: null }
    };
}

function mapPortfolioItemToRow(item) {
    return {
        id: item.id,
        slug: item.slug,
        title: item.title,
        subtitle: item.subtitle,
        category: item.category,
        client_id: item.clientId,
        role: item.role,
        type: item.type,
        featured: !!item.featured,
        published: !!item.published,
        updated_at: item.updatedAt || new Date().toISOString(),
        text_content: item.text,
        what_i_did: item.whatIDid || [],
        tags: item.tags || [],
        links: item.links || { url: "" },
        media: item.media || { heroImage: null }
    };
}

export async function fetchPortfolioItems({ onlyPublished = false } = {}) {
    let query = supabase
        .from("portfolio_items")
        .select("*")
        .order("updated_at", { ascending: false });

    if (onlyPublished) {
        query = query.eq("published", true);
    }

    const { data, error } = await query;

    if (error) {
        throw new Error(`Kon portfolio-items niet ophalen: ${error.message}`);
    }

    return (data || []).map(mapPortfolioRowToItem);
}

export async function savePortfolioItem(item) {
    const row = mapPortfolioItemToRow(item);

    const { error } = await supabase.from("portfolio_items").upsert(row);

    if (error) {
        throw new Error(`Kon portfolio-item niet opslaan: ${error.message}`);
    }
}

export async function deletePortfolioItem(id) {
    const { error } = await supabase
        .from("portfolio_items")
        .delete()
        .eq("id", id);

    if (error) {
        throw new Error(`Kon portfolio-item niet verwijderen: ${error.message}`);
    }
}

/* =====================================
   BLOGS  (blog_posts)
===================================== */

function mapBlogRowToPost(row) {
    return {
        id: row.id,
        category: row.category,
        title: row.title,
        subtitle: row.subtitle,
        content: row.content || [],
        media: row.media || { heroImage: null, videoUrl: "" },
        links: row.links || [],
        seo: row.seo || { metaTitle: "", metaDescription: "", keywords: [] },
        createdAt: row.created_at
    };
}

function mapBlogPostToRow(post) {
    return {
        id: post.id,
        category: post.category,
        title: post.title,
        subtitle: post.subtitle,
        content: post.content || [],
        media: post.media || { heroImage: null, videoUrl: "" },
        links: post.links || [],
        seo: post.seo || { metaTitle: "", metaDescription: "", keywords: [] },
        created_at: post.createdAt || new Date().toISOString()
    };
}

export async function fetchBlogPosts() {
    const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        throw new Error(`Kon blogposts niet ophalen: ${error.message}`);
    }

    return (data || []).map(mapBlogRowToPost);
}

export async function saveBlogPost(post) {
    const row = mapBlogPostToRow(post);

    const { error } = await supabase.from("blog_posts").upsert(row);

    if (error) {
        throw new Error(`Kon blogpost niet opslaan: ${error.message}`);
    }
}

export async function deleteBlogPost(id) {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);

    if (error) {
        throw new Error(`Kon blogpost niet verwijderen: ${error.message}`);
    }
}
