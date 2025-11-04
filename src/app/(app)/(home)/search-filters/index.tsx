"use client"
import {SearchInput} from "@/app/(app)/(home)/search-filters/search-input";

import {Categories} from "@/app/(app)/(home)/search-filters/categories";
import { useSuspenseQuery } from '@tanstack/react-query';
import {useTRPC} from '@/trpc/client';

export const SearchFilters = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());
    return (
        <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
                style={{
                    backgroundColor: "white",
                    }}
        >
            <SearchInput/>
           <div className="hidden lg:block">
               <Categories data={data}/>
           </div>
        </div>
    )
}
export const SearchFiltersLoading = () => {
    return (
        <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
             style={{
                 backgroundColor: "white",
             }}
        >
            <SearchInput disabled/>
            <div className="hidden lg:block">
               <div className="h-11"/>
            </div>
        </div>
    )
}