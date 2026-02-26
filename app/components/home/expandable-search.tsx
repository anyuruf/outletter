import { Command, CommandEmpty, CommandInput, CommandList } from "cmdk"
import { Search } from "lucide-react"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

function ExpandableSearch() {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button type="button" className="justify-betweeen inline-flex h-7 w-8 items-center p-0 font-semibold text-md">
					<Search size={2} strokeWidth={2} />
				</Button>
			</PopoverTrigger>
			<PopoverContent align="end" className="max-w-lgv">
				<Command>
					<CommandInput placeholder="Search products..." asChild>
						<Input className="mb-4" />
					</CommandInput>
					<CommandList className="mx-auto w-full">
						<CommandEmpty>Zero results.</CommandEmpty>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

export default ExpandableSearch
