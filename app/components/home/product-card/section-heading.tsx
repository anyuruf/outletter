import { GradientText } from "@/components/shadcn-io/GradientText"

interface Props {
	text: string
}
function SectionHeading({ text }: Props) {
	return (
		<>
			<GradientText className="px-2 font-extrabold text-6xl text-shadow-md" text={text} />
			<span className="sr-only">Level two heading</span>
		</>
	)
}

export default SectionHeading
