import { connectMongoDB } from "@/lib/MongoConnect";
import Product from "@/lib/models/Product";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const { name, category, price, imgSrc, fileKey } = await req.json();

        await connectMongoDB()
        const data = await Product.create({
            name, category, price, imgSrc, fileKey
        })
        return NextResponse.json(
            {
                message: "Product Added successfully",
                data
            },
            {
                status: 200
            })
    } catch (error) {
        return NextResponse.json(
            {
                error,
                message: "Something went wrong",
            },
            {
                status: 400
            }
        )
    }
}