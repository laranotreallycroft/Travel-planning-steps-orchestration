package com.odysseus.utils;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PackingListPresets {
    private static final Map<Long, List<String>> PRESET_ITEMS;
    private static final Map<Long, String> PRESET_LABELS;

    static {
        Map<Long, List<String>> presetItems = new HashMap<>();

        // Add your presetItems here
        presetItems.put(1L, List.of("Pleasure Reading", "Chewing Gum", "Snacks", "Water Bottle", "Earplugs",
                "Sleeping Mask", "Travel Pillow", "Motion Sickness Remedy", "Sleeping Pills", "Anxiety Medication"));
        presetItems.put(2L, List.of("Wallet", "Cash", "Credit Cards"));
        presetItems.put(3L, List.of("Maps", "Travel Guides"));
        presetItems.put(4L, List.of("Underwear", "Socks", "Undershirts", "Bras", "Pantyhose", "Sleepwear", "Robe"));
        presetItems.put(5L, List.of("Dress Shirts", "Blazers", "Slacks", "Skirts", "Dresses", "Suits", "Tuxedo"));
        presetItems.put(6L, List.of("Jackets", "Raincoats"));
        presetItems.put(7L, List.of("T-Shirts", "Tank Tops", "Sweatshirts", "Jeans", "Exercise Clothing"));
        presetItems.put(8L, List.of("Athletic Shoes", "Leisure Shoes", "Dress Shoes", "Slippers"));
        presetItems.put(9L, List.of("Belts", "Ties", "Wristwatches", "Jewelry", "Sunglasses", "Reading Glasses"));
        presetItems.put(10L, List.of("Toothbrush", "Toothpaste", "Dental Floss", "Mouthwash", "Soap", "Washcloth",
                "Deodorant", "Shampoo", "Conditioner", "Brush", "Comb", "Curling Iron", "Flat Iron", "Styling Products",
                "Hair Accessories", "Mirror", "Cleanser", "Sunscreen", "Moisturizer", "Lip Balm", "Contact Lenses",
                "Saline Solution", "Shaving Cream", "Razor", "Perfume", "Makeup", "Makeup Remover", "Birth Control",
                "Feminine Hygiene", "Nail Clippers", "Nail File", "Hand Wipes", "Tissues", "Cotton Swabs", "Tweezers",
                "Medications", "Pain Reliever", "Vitamins", "First Aid", "Band Aids", "Towels"));
        presetItems.put(11L, List.of("Passport", "Visa", "Driver's Licence", "Travel Tickets", "Emergency Contact Info",
                "Medical Insurance Card", "Prescriptions", "Travel Insurance", "Car Insurance Card"));
        presetItems.put(12L, List.of("Backpack", "Purse", "Tote", "Plastic Bags"));
        presetItems.put(13L, List.of("Umbrella", "House Keys", "Luggage Tags", "Hospitality Gifts", "Journal"));
        presetItems.put(14L, List.of("Cell Phone", "Cell Phone Charger", "Laptop", "Laptop Charger", "Camera",
                "Camera Charger", "Headphones", "Batteries", "Flashlight"));
        presetItems.put(15L, List.of("Work Documents", "Office Supplies", "Business Cards", "Laptop Bag"));
        presetItems.put(16L, List.of("Shorts", "Swimsuits", "Tank tops", "Sun hat"));
        presetItems.put(17L, List.of("Sandals", "Flip-flops"));
        presetItems.put(18L, List.of("Insect repellent", "Beach cover-up", "Bandana"));
        presetItems.put(19L, List.of("Beach Towel", "Beach Ball", "Snorkeling gear", "Waterproof phone case",
                "Beach umbrella", "Cooler bag", "Hammock", "Beach chair"));
        presetItems.put(20L, List.of("Thermal socks", "Wool socks"));
        presetItems.put(21L, List.of("Sweaters"));
        presetItems.put(22L, List.of("Coats", "Skiwear", "Thermal underwear"));
        presetItems.put(23L, List.of("Long-sleeve shirts", "Warm hoodies", "Fleece jackets"));
        presetItems.put(24L, List.of("Winter boots"));
        presetItems.put(25L, List.of("Hats", "Gloves", "Scarves", "Ear muffs", "Thermal leggings", "Neck warmers"));
        presetItems.put(26L, List.of("Hand warmers", "Hot water bottle", "Hot packs", "Thermal blanket",
                "Pocket warmers", "Snow goggles", "Ice grips for shoes", "Ski gloves"));

        PRESET_ITEMS = Collections.unmodifiableMap(presetItems);
        Map<Long, String> presetLabels = new HashMap<>();

        // Add your presetItems here
        presetLabels.put(1L, "Travel Aids");
        presetLabels.put(2L, "Funds");
        presetLabels.put(3L, "Travel Info");
        presetLabels.put(4L, "Basic Clothes");
        presetLabels.put(5L, "Dressy Clothes");
        presetLabels.put(6L, "Outerwear");
        presetLabels.put(7L, "Casual Clothes");
        presetLabels.put(8L, "Footwear");
        presetLabels.put(9L, "Accessories");
        presetLabels.put(10L, "Hygiene");
        presetLabels.put(11L, "Documents");
        presetLabels.put(12L, "Bags");
        presetLabels.put(13L, "Miscellaneous");
        presetLabels.put(14L, "Technology");
        presetLabels.put(15L, "Work");
        presetLabels.put(16L, "Casual Summer Clothes");
        presetLabels.put(17L, "Summer Footwear");
        presetLabels.put(18L, "Summer Accessories");
        presetLabels.put(19L, "Summer Miscellaneous");
        presetLabels.put(20L, "Basic Winter Clothes");
        presetLabels.put(21L, "Dressy Winter Clothes");
        presetLabels.put(22L, "Winter Outerwear");
        presetLabels.put(23L, "Casual Winter Clothes");
        presetLabels.put(24L, "Winter Footwear");
        presetLabels.put(25L, "Winter Accessories");
        presetLabels.put(26L, "Winter Miscellaneous");

        PRESET_LABELS = Collections.unmodifiableMap(presetLabels);
    }

    public static Map<Long, List<String>> getAllPresetItems() {
        return PRESET_ITEMS;
    }

    public static List<String> getPresetItemById(Long id) {
        return PRESET_ITEMS.get(id);
    }

    public static String getPresetLabelById(Long id) {
        return PRESET_LABELS.get(id);
    }
}
