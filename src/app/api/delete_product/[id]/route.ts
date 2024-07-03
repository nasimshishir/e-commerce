import { connectMongoDB } from "@/lib/MongoConnect";
import Product from "@/lib/models/Product";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(req: NextRequest, URLParams: any) {
    try {
        const id = URLParams.params.id

        await connectMongoDB()
        await Product.findByIdAndDelete(id)
        return NextResponse.json({
            message: "Product deleted successfully",
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