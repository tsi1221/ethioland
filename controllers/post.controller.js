
import prisma from "../prisma.js"; // ✅ Make sure this path is correct

// ✅ Get all posts
export const getPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany();
        res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};




// ✅ Get a single post by ID
export const getPostById = async (req, res) => {
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: req.params.id,
            },
        });

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.json(post);
    } catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


// ✅ Create a new post
export const addPost = async (req, res) => {
    const body = req.body;
    const tokenUserId = req.userId;
    try {

        const newPost = await prisma.post.create({
            data: { ...body, userId: tokenUserId ,}
        });

        res.status(201).json(newPost);
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



// ✅ Update an existing post
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const updatedPost = await prisma.post.update({
            where: { id },
            data: { title, content },
        });

        res.json(updatedPost);
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};






// ✅ Delete a post
export const deletePost = async (req, res) => {
    const id = req.params.id;

    try {
        // Check if the post exists
        const post = await prisma.post.findUnique({
            where: { id },
        });

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Authorization check (userId must match)
        if (post.userId !== req.userId) {
            return res.status(403).json({ error: "You are not authorized to delete this post" });
        }

        // Delete the post
        await prisma.post.delete({
            where: { id },
        });

        res.status(204).send(); // ✅ Success: No content
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
