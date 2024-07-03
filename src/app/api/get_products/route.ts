import { connectMongoDB } from "@/lib/MongoConnect";
import Product from "@/lib/models/Product";
import { error } from "console";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        await connectMongoDB()
        const data = await Product.find()
        return NextResponse.json(data)
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