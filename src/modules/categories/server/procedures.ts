
import {baseProcedure, createTRPCRouter} from "@/trpc/init";
import {Category} from "@/payload-types";

export const categoriesRouter = createTRPCRouter({
    getMany: baseProcedure.query(async ({ctx}) => {
        const data = await ctx.db.find({
            collection: 'categories',
            depth: 1, // Dòng này dùng để populate các subcategories
            pagination: false,
            where: {
                parent: {
                    exists: false,
                }
            },
            sort: "name",
        });
        const formattedData = data.docs.map((doc: Category) => ({
            ...doc,
            subcategories: (doc.subcategories?.docs ?? []).map(
                // Vì chúng ta đã đặt depth: 1, các subcategory sẽ được populate đầy đủ
                (doc) => ({
                    ...(doc as Category),
                    subcategories: undefined, // Loại bỏ subcategories con để tránh lặp vô hạn
                }))
        }));
        return formattedData;
    }),
});