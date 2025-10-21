// Base de datos de productos - Perfumes Colombia
const productsData = {
    hombre: [
        {
            id: 1,
            name: "Lattafa Asad",
            price: 89900,
            originalPrice: 120000,
            category: "hombre",
            description: "Fragancia oriental con notas de pimienta negra, piña y tabaco. Duración 8-10 horas.",
            image: "🌙",
            inStock: true,
            stock: 15
        },
        {
            id: 2,
            name: "Paco Rabanne 1 Million",
            price: 95000,
            originalPrice: 130000,
            category: "hombre", 
            description: "Fragancia icónica con notas de menta fresca, canela y cuero seductor.",
            image: "💎",
            inStock: true,
            stock: 8
        },
        {
            id: 3,
            name: "Dior Sauvage",
            price: 110000,
            originalPrice: 150000,
            category: "hombre",
            description: "Fragancia amaderada aromática con bergamota y pimienta. Elegante y versátil.",
            image: "🌊",
            inStock: true,
            stock: 12
        },
        {
            id: 4,
            name: "Bleu de Chanel",
            price: 105000,
            originalPrice: 145000,
            category: "hombre",
            description: "Fragancia sofisticada con notas cítricas y amaderadas. Elegancia atemporal.",
            image: "🔵",
            inStock: true,
            stock: 6
        }
    ],
    
    mujer: [
        {
            id: 5,
            name: "Carolina Herrera Good Girl",
            price: 129900,
            originalPrice: 169900,
            category: "mujer",
            description: "Fragancia femenina con notas de jazmín y tonka. Elegante y seductora.",
            image: "👠",
            inStock: true,
            stock: 10
        },
        {
            id: 6,
            name: "Lattafa Yara",
            price: 85000,
            originalPrice: 115000,
            category: "mujer",
            description: "Fragancia de vainilla ámbar con orquídeas y mandarina. Dulce y femenina.",
            image: "🌺",
            inStock: true,
            stock: 18
        },
        {
            id: 7,
            name: "Black Opium YSL",
            price: 135000,
            originalPrice: 175000,
            category: "mujer",
            description: "Fragancia gourmand con café y vainilla. Intensa y adictiva.",
            image: "☕",
            inStock: true,
            stock: 7
        }
    ],
    
    combos: [
        {
            id: 8,
            name: "Combo Romance",
            price: 199900,
            originalPrice: 250000,
            category: "combo",
            description: "Pack especial: 1 perfume para él + 1 perfume para ella. Ahorra $50.100",
            image: "💑",
            inStock: true,
            stock: 5
        },
        {
            id: 9,
            name: "Combo Elegancia",
            price: 179900,
            originalPrice: 220000,
            category: "combo", 
            description: "Dos fragancias masculinas de alta gama. Perfecto para regalo.",
            image: "🎩",
            inStock: true,
            stock: 3
        },
        {
            id: 10,
            name: "Combo Seducción",
            price: 189900,
            originalPrice: 240000,
            category: "combo",
            description: "Dos fragancias femeninas exclusivas. Ahorra $50.100",
            image: "💋",
            inStock: true,
            stock: 4
        }
    ]
};

// Aquí después agregarás los otros 406 productos siguiendo el mismo formato