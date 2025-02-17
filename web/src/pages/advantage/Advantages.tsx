import React, {useState, useEffect} from 'react'
import {AdvantageCategory} from 'd100-libs'
import {categoryIcons, specialReqsToString, reqToString} from './utils'
import IconResolver from '../../components/IconResolver'
import useCollectionPage from '../../hooks/useCollectionPage'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {Button} from '@/components/ui/button'
import {Advantage} from '@/state/advantage/slice'
import {Modal} from './Modal';

export const Advantages = () => {
    const {data: advantages, handleEditClick, handleCreateClick, setSelected, selected, special} = useCollectionPage('advantage');
    const [categories, setCategories] = useState<AdvantageCategory[]>([])
    const [openCategory, setOpenCategory] = useState<AdvantageCategory|null>()

    const toggleOpen = (cat: AdvantageCategory) => {
        if (openCategory === cat) {
            setOpenCategory(null)
        } else {
            setOpenCategory(cat)
        }
    }

    useEffect(() => {
        if (!advantages.length) {
            return;
        } else {
            const categories: AdvantageCategory[] = [];
            advantages.forEach(advantage => {
                if (!categories.includes(advantage.category)) {
                    categories.push(advantage.category);
                }
            });
            setCategories(categories.sort());
            setOpenCategory(categories[0]);
        }
    }, [advantages])

    return (
        <div className="w-full p-8">
            <Accordion type="single" collapsible className="w-full">
                {categories.map((category, index) => (
                    <AccordionItem value={`category-${index}`} key={category}>
                        <AccordionTrigger>
                            <div className="flex items-center gap-2">
                                <IconResolver iconName={categoryIcons[category]} />{category.replace('_', ' ')}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-0">
                            <ul>
                            {advantages.filter((advantage: Advantage) => advantage.category === category)
                                .sort((a,b) => a.name < b.name ? -1 : 1).map(
                                    (item: Advantage) => (
                                        <li
                                            className="flex w-full justify-between items-center p-2
                                            border-b-gray-200 border-b last:border-none first:border-t cursor-pointer hover:bg-gray-50"
                                            key={item.id}
                                            onClick={() => setSelected(item)}
                                        >
                                            {item.name}
                                            <Button variant="outline" onClick={(e) => handleEditClick(e, item.id as string)}>Edit</Button>
                                        </li>
                                    ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
            <Modal advantage={selected} setSelected={setSelected} />
        </div>
    )
}
