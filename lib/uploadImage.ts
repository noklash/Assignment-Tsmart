import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
})

export async function POST(request: Request) {
    const { path } = await request.json();

    if (!path){
        return NextResponse.json({ messages: "Image path is required"}, { status: 400 });

    }
    try {
        const options = { 
            use_filename: true,
            unique_filenam: false,
            overwrite: true,
            transformation: [{width: 1000, height: 752, crop: "scale"}],
        };

        const result = await cloudinary.uploader.upload(path, options);
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to uplaod image on cloudinary"})
    }
}