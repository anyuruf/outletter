import { ChevronDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CATEGORY_GROUPS } from "@/constants/categories"
import { cn } from "@/utils/misc"

function SearchForm() {
	return (
		<>
			{/* flex classes are for the parent container */}
			<form className="hidden flex-grow justify-center gap-4 md:flex">
				<div className="relative w-full max-w-xl">
					{/* Left Button/Popover. top-0 for (top-1/2 -translate-y-1/2) */}
					<CategoryPopover classNames="absolute  top-1/2 -translate-y-1/2 left-0" />
					{/* Input */}
					<Input
						type="search"
						placeholder="Search for products..."
						className="h-10 w-full border-3 border-y-primary px-28 font-semibold text-lg focus-visible:ring-[4px]"
					/>

					{/* Right button */}
					<Button
						type="submit"
						className="absolute top-1/2 right-0 z-10 inline-flex -translate-y-1/2 items-center gap-2 rounded-l-none px-4 py-2 font-semibold text-md"
					>
						<Search strokeWidth={3} className="h-4 w-4" />
						<span>Search</span>
					</Button>
				</div>
			</form>
		</>
	)
}

function CategoryPopover({ classNames }: { classNames: string }) {
	return (
		<Popover>
			<PopoverTrigger
				className={cn("inline-flex items-center gap-2 rounded-r-none px-4 py-2 font-semibold text-md", classNames)}
			>
				<span>Category</span>
				<ChevronDown strokeWidth={3} className="h-4 w-4" />
			</PopoverTrigger>

			<PopoverContent className="grid w-3xl grid-cols-[repeat(auto-fill,minmax(128px,1fr))] gap-4 px-6" align="center">
				{CATEGORY_GROUPS.map((group) => (
					<div key={group.title}>
						<h4 className="mb-2 font-semibold text-sm">{group.title}</h4>
						<ul className="space-y-1">
							{group.items.map((item) => (
								<li
									key={item}
									className="cursor-pointer text-muted-foreground text-sm transition-colors hover:text-primary"
								>
									{item}
								</li>
							))}
						</ul>
					</div>
				))}
			</PopoverContent>
		</Popover>
	)
}

export default SearchForm
