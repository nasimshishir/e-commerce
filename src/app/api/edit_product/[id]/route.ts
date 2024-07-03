import { connectMongoDB } from "@/lib/MongoConnect";
import Product from "@/lib/models/Product";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req: NextRequest, URLParams: any) {
    try {
        const body = await req.json()
        const id = URLParams.params.id
        const { name, category, price } = body;

        await connectMongoDB()
        const data = await Product.findByIdAndUpdate(id, {
            name, category, price
        })
        return NextResponse.json({
            message: "Product updated successfully",
            data
        }, { status: 200 })
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