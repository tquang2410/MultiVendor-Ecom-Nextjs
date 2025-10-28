import {Category} from "@/payload-types";
import {CategoryDropdown} from "@/app/(app)/(home)/search-filters/category-dropdown";

interface Props {
    data: any;
}
export const Categories = ({data}: Props) => {
    return(
        <div>
            {data.map((category: Category) => (
                    <div key={category.id}>
                        <CategoryDropdown
                            category={category}
                            isActive={false}
                            isNavigationHovered={false}
                        />
                    </div>
            ))}
        </div>
    )
}