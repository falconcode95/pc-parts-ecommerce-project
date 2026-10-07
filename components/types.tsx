

const brandAndTypes  = {
    "cases": [],
    "fans": [],
    "cooler": ["Air Cooler", "Liquid Cooler"],
    "motherboard": ["ASRock", "MSI", "Gigabyte", "ASUS"],
    "cpu": ["AMD", "Intel"],
    "graphics-card": ["AMD", "NVIDIA", "Intel"],
    "ram": ["DDR4", "DDR5"],
    "storage": ["SSD", "NVMe"],
    "power-supply": ["500W", "700W", "800W", "1000W", "1200W"],
    "combo": ["AMD", "Intel"],
    "prebuilt": [],
    "select a category": []
}

export type CategoryType = keyof typeof brandAndTypes;

export default function Types({category}: {category: CategoryType}) {
    return (
        <div className="flex flex-wrap gap-4">
            { brandAndTypes[category] && brandAndTypes[category].length > 0 && brandAndTypes[category].map((type, index) => {
                return (
                    <span key={index}>
                        <input type="radio" name={type} value={type} id={type} />
                        <label className="ml-2" htmlFor={type}>{type}</label>
                    </span>
                )
            })}
        </div>
    )
}