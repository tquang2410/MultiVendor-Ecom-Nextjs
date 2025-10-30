import configPromise from '@payload-config'
import { getPayload } from 'payload'
import {Navbar} from "@/app/(app)/(home)/navbar";
import {Footer} from "@/app/(app)/(home)/footer";
import {SearchFilters} from "@/app/(app)/(home)/search-filters";
import {Category} from "@/payload-types";
import {CustomCategory} from "@/app/(app)/(home)/type";


interface Props {
    children: React.ReactNode;
}
const Layout = async ({children} : Props) => {
    const payload = await getPayload({
        config: configPromise,
    });
    const data = await payload.find({
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
    const formattedData: CustomCategory[] = data.docs.map((doc: Category) => ({
        ...doc,
        subcategories: (doc.subcategories?.docs ?? []).map(
            // Vì chúng ta đã đặt depth: 1, các subcategory sẽ được populate đầy đủ
            (doc) => ({
            ...(doc as CustomCategory),
            subcategories: undefined, // Loại bỏ subcategories con để tránh lặp vô hạn
        }))
    }));
    return (
        <div className="flex flex-col min-h-screen">
           <Navbar />
            <SearchFilters data={formattedData}/>
            <div className="flex-1 bg-[#F4F4F0]">
                {children}
            </div>
            <Footer/>
        </div>
    )
}
export default Layout;