import prisma from "../prisma"; // Update the path as needed

export const getPosts=async (req,res)=>{
    try {
        const posts = await prisma.post.findUnique({
            where: {
                id: req.params.id
            }
        });
        res.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


export const addPosts=async (req,res)=>{
    try {
        const posts = await prisma.post.findMany();
        res.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


export const updatePosts=async (req,res)=>{
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
}


export const deletePosts=async (req,res)=>{
    try {
        const { id } = req.params;

        await prisma.post.delete({
            where: { id },
        });

        res.status(204).send();
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
        res.status(500).json({ error: "Internal server error" });
    }
}