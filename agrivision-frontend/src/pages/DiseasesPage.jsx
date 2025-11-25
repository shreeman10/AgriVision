import React, { useState } from 'react';
import { Search, Filter, Leaf, AlertCircle } from 'lucide-react';

const DiseasesPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCrop, setSelectedCrop] = useState('All');
    const [selectedSeverity, setSelectedSeverity] = useState('All');

    const diseases = [
        {
            id: 1,
            name: 'Apple Scab',
            scientific: 'Venturia inaequalis',
            crop: 'Apple',
            severity: 'Moderate',
            confidence: '95-99%',
            image: 'https://image.pollinations.ai/prompt/apple%20scab%20leaf%20disease%20macro%20photo',
            symptoms: [
                'Olive-green to black velvety spots on leaves',
                'Scab-like lesions on fruit',
                'Yellowing and premature leaf drop',
                'Fruit distortion and cracking'
            ],
            treatment: [
                'Apply fungicides like Captan or Sulfur',
                'Prune to improve air circulation',
                'Remove and destroy fallen leaves',
                'Plant resistant varieties'
            ],
            prevention: [
                'Sanitize tools between cuts',
                'Rake and dispose of leaves in autumn',
                'Avoid overhead irrigation'
            ],
            season: 'Spring, cool and wet weather',
            spread: 'Wind and rain splash'
        },
        {
            id: 2,
            name: 'Black Rot',
            scientific: 'Botryosphaeria obtusa',
            crop: 'Apple',
            severity: 'Severe',
            confidence: '94-98%',
            image: 'https://image.pollinations.ai/prompt/apple%20black%20rot%20fruit%20disease',
            symptoms: [
                'Purple spots on leaves (frog-eye leaf spot)',
                'Rotting fruit with black concentric rings',
                'Cankers on limbs and branches',
                'Mummified fruit remaining on tree'
            ],
            treatment: [
                'Prune out infected branches and cankers',
                'Remove mummified fruit',
                'Apply appropriate fungicides'
            ],
            prevention: [
                'Maintain tree health and vigor',
                'Protect from mechanical injury',
                'Burn infected prunings'
            ],
            season: 'Warm, humid weather',
            spread: 'Spores from cankers and mummies'
        },
        {
            id: 3,
            name: 'Cedar Apple Rust',
            scientific: 'Gymnosporangium juniperi-virginianae',
            crop: 'Apple',
            severity: 'Moderate',
            confidence: '96-99%',
            image: 'https://image.pollinations.ai/prompt/cedar%20apple%20rust%20leaf%20spots',
            symptoms: [
                'Bright orange-yellow spots on leaves',
                'Tube-like structures on fruit undersides',
                'Premature defoliation',
                'Reduced fruit quality'
            ],
            treatment: [
                'Apply fungicides (Myclobutanil)',
                'Remove nearby juniper/cedar hosts',
                'Prune galls from cedar trees'
            ],
            prevention: [
                'Plant resistant apple varieties',
                'Remove Eastern Red Cedar within 2 miles',
                'Monitor for galls in spring'
            ],
            season: 'Spring, wet weather',
            spread: 'Wind-blown spores from cedar trees'
        },
        {
            id: 4,
            name: 'Powdery Mildew',
            scientific: 'Podosphaera clandestina',
            crop: 'Cherry',
            severity: 'Mild',
            confidence: '97-99%',
            image: 'https://image.pollinations.ai/prompt/cherry%20powdery%20mildew%20white%20fungus%20on%20leaf',
            symptoms: [
                'White powdery growth on leaves and fruit',
                'Leaf curling and distortion',
                'Stunted shoot growth',
                'Premature leaf drop'
            ],
            treatment: [
                'Apply sulfur or potassium bicarbonate',
                'Prune for better light and airflow',
                'Use fungicides if severe'
            ],
            prevention: [
                'Plant in full sun',
                'Avoid excessive nitrogen fertilizer',
                'Maintain good air circulation'
            ],
            season: 'Warm, dry days and cool nights',
            spread: 'Wind-blown spores'
        },
        {
            id: 5,
            name: 'Gray Leaf Spot',
            scientific: 'Cercospora zeae-maydis',
            crop: 'Corn',
            severity: 'Moderate',
            confidence: '93-97%',
            image: 'https://image.pollinations.ai/prompt/corn%20gray%20leaf%20spot%20disease',
            symptoms: [
                'Rectangular gray to tan lesions',
                'Lesions run parallel to leaf veins',
                'Entire leaves may turn brown and die',
                'Reduced grain fill'
            ],
            treatment: [
                'Apply foliar fungicides',
                'Rotate crops',
                'Plant resistant hybrids'
            ],
            prevention: [
                'Manage crop residue',
                'Avoid continuous corn planting',
                'Monitor fields regularly'
            ],
            season: 'Warm, humid conditions',
            spread: 'Wind and rain splash'
        },
        {
            id: 6,
            name: 'Common Rust',
            scientific: 'Puccinia sorghi',
            crop: 'Corn',
            severity: 'Mild',
            confidence: '98-100%',
            image: 'https://image.pollinations.ai/prompt/corn%20common%20rust%20leaf%20pustules',
            symptoms: [
                'Cinnamon-brown pustules on leaf surfaces',
                'Pustules turn black as plant matures',
                'Yellowing around pustules',
                'Stunted growth in severe cases'
            ],
            treatment: [
                'Fungicides (usually not necessary)',
                'Plant resistant hybrids',
                'Early planting'
            ],
            prevention: [
                'Use resistant varieties',
                'Monitor for early signs',
                'Crop rotation'
            ],
            season: 'Cool, moist weather',
            spread: 'Wind-blown spores'
        },
        {
            id: 7,
            name: 'Northern Leaf Blight',
            scientific: 'Exserohilum turcicum',
            crop: 'Corn',
            severity: 'Moderate',
            confidence: '94-98%',
            image: 'https://image.pollinations.ai/prompt/corn%20northern%20leaf%20blight%20lesions',
            symptoms: [
                'Long, cigar-shaped gray-green lesions',
                'Lesions can be several inches long',
                'Leaves turn brown and die',
                'Reduced yield'
            ],
            treatment: [
                'Fungicides at early tasseling',
                'Crop rotation',
                'Tillage to bury residue'
            ],
            prevention: [
                'Plant resistant hybrids',
                'Manage corn residue',
                'Rotate with non-host crops'
            ],
            season: 'Moderate temperatures, wet weather',
            spread: 'Wind and rain'
        },
        {
            id: 8,
            name: 'Black Rot',
            scientific: 'Guignardia bidwellii',
            crop: 'Grape',
            severity: 'Severe',
            confidence: '98-100%',
            image: 'https://image.pollinations.ai/prompt/grape%20black%20rot%20fruit%20mummies',
            symptoms: [
                'Brown circular spots on leaves',
                'Shriveled, black "mummy" berries',
                'Lesions on stems and tendrils',
                'Fruit drop'
            ],
            treatment: [
                'Remove and destroy mummies',
                'Apply fungicides (Mancozeb, Myclobutanil)',
                'Prune for airflow'
            ],
            prevention: [
                'Sanitation is key',
                'Plant in sunny locations',
                'Weed control'
            ],
            season: 'Warm, humid weather',
            spread: 'Rain splash and wind'
        },
        {
            id: 9,
            name: 'Esca (Black Measles)',
            scientific: 'Phaeomoniella chlamydospora',
            crop: 'Grape',
            severity: 'Severe',
            confidence: '95-99%',
            image: 'https://image.pollinations.ai/prompt/grape%20esca%20black%20measles%20disease',
            symptoms: [
                'Tiger-stripe pattern on leaves',
                'Dark spotting on fruit ("measles")',
                'Sudden wilting of vines',
                'Wood rot'
            ],
            treatment: [
                'No cure for established vines',
                'Prune out infected wood',
                'Protect pruning wounds'
            ],
            prevention: [
                'Plant certified disease-free vines',
                'Minimize pruning wounds',
                'Remove dead vines'
            ],
            season: 'Summer',
            spread: 'Wind-borne spores entering wounds'
        },
        {
            id: 10,
            name: 'Leaf Blight',
            scientific: 'Pseudocercospora vitis',
            crop: 'Grape',
            severity: 'Moderate',
            confidence: '96-99%',
            image: 'https://image.pollinations.ai/prompt/grape%20leaf%20blight%20isariopsis',
            symptoms: [
                'Irregular brown spots with dark borders',
                'Premature leaf drop',
                'Reduced vine vigor',
                'Sunburn on exposed fruit'
            ],
            treatment: [
                'Fungicides',
                'Manage canopy for airflow',
                'Remove infected leaves'
            ],
            prevention: [
                'Dormant sprays',
                'Good sanitation',
                'Balanced fertilization'
            ],
            season: 'Late summer, wet conditions',
            spread: 'Rain splash'
        },
        {
            id: 11,
            name: 'Citrus Greening',
            scientific: 'Candidatus Liberibacter asiaticus',
            crop: 'Orange',
            severity: 'Severe',
            confidence: '98-100%',
            image: 'https://image.pollinations.ai/prompt/citrus%20greening%20disease%20orange%20leaf',
            symptoms: [
                'Yellow mottling on leaves',
                'Misshapen, bitter fruit',
                'Fruit stays green at bottom',
                'Tree decline and death'
            ],
            treatment: [
                'No cure available',
                'Remove infected trees immediately',
                'Control psyllid vectors'
            ],
            prevention: [
                'Use disease-free nursery stock',
                'Monitor for Asian Citrus Psyllid',
                'Quarantine regulations'
            ],
            season: 'Year-round',
            spread: 'Asian Citrus Psyllid'
        },
        {
            id: 12,
            name: 'Bacterial Spot',
            scientific: 'Xanthomonas campestris pv. pruni',
            crop: 'Peach',
            severity: 'Moderate',
            confidence: '96-99%',
            image: 'https://image.pollinations.ai/prompt/peach%20bacterial%20spot%20fruit%20damage',
            symptoms: [
                'Water-soaked spots on leaves',
                'Shot-hole effect on leaves',
                'Cracking and pitting of fruit',
                'Twig cankers'
            ],
            treatment: [
                'Copper sprays during dormancy',
                'Antibiotic sprays (Oxytetracycline)',
                'Balanced fertilization'
            ],
            prevention: [
                'Plant resistant varieties',
                'Avoid sandy sites',
                'Windbreaks to reduce abrasion'
            ],
            season: 'Warm, wet spring',
            spread: 'Wind-driven rain'
        },
        {
            id: 13,
            name: 'Bacterial Spot',
            scientific: 'Xanthomonas campestris',
            crop: 'Pepper',
            severity: 'Moderate',
            confidence: '95-98%',
            image: 'https://image.pollinations.ai/prompt/pepper%20bacterial%20spot%20leaf%20lesions',
            symptoms: [
                'Small water-soaked spots on leaves',
                'Spots turn brown with yellow halos',
                'Raised spots on fruit',
                'Leaf drop'
            ],
            treatment: [
                'Copper-based bactericides',
                'Remove infected plants',
                'Avoid overhead watering'
            ],
            prevention: [
                'Use treated seeds',
                'Crop rotation',
                'Mulching'
            ],
            season: 'Warm, humid weather',
            spread: 'Splashing water and tools'
        },
        {
            id: 14,
            name: 'Early Blight',
            scientific: 'Alternaria solani',
            crop: 'Potato',
            severity: 'Moderate',
            confidence: '97-99%',
            image: 'https://image.pollinations.ai/prompt/potato%20early%20blight%20leaf%20spots',
            symptoms: [
                'Target-like brown spots on older leaves',
                'Yellowing around spots',
                'Leaf drop',
                'Dark lesions on tubers'
            ],
            treatment: [
                'Fungicides (Chlorothalonil)',
                'Maintain plant vigor',
                'Harvest when vines are completely dead'
            ],
            prevention: [
                'Crop rotation',
                'Use certified seed',
                'Proper fertilization'
            ],
            season: 'Mid to late season',
            spread: 'Wind and rain'
        },
        {
            id: 15,
            name: 'Late Blight',
            scientific: 'Phytophthora infestans',
            crop: 'Potato',
            severity: 'Severe',
            confidence: '95-99%',
            image: 'https://image.pollinations.ai/prompt/potato%20late%20blight%20leaf%20damage',
            symptoms: [
                'Large dark spots on leaves',
                'White fuzzy mold on undersides',
                'Brown rot on tubers',
                'Rapid plant death'
            ],
            treatment: [
                'Preventative fungicides',
                'Kill vines before harvest',
                'Destroy cull piles'
            ],
            prevention: [
                'Plant resistant varieties',
                'Eliminate volunteer plants',
                'Monitor weather conditions'
            ],
            season: 'Cool, wet weather',
            spread: 'Wind-borne spores'
        },
        {
            id: 16,
            name: 'Powdery Mildew',
            scientific: 'Podosphaera xanthii',
            crop: 'Squash',
            severity: 'Moderate',
            confidence: '98-100%',
            image: 'https://image.pollinations.ai/prompt/squash%20powdery%20mildew%20white%20spots',
            symptoms: [
                'White powdery spots on leaves and stems',
                'Leaves turn yellow and dry out',
                'Reduced fruit quality',
                'Sunscald on exposed fruit'
            ],
            treatment: [
                'Fungicides',
                'Neem oil',
                'Remove infected leaves'
            ],
            prevention: [
                'Plant resistant varieties',
                'Good air circulation',
                'Avoid shade'
            ],
            season: 'Warm, dry weather',
            spread: 'Wind'
        },
        {
            id: 17,
            name: 'Leaf Scorch',
            scientific: 'Diplocarpon earliana',
            crop: 'Strawberry',
            severity: 'Moderate',
            confidence: '98-100%',
            image: 'https://image.pollinations.ai/prompt/strawberry%20leaf%20scorch%20disease',
            symptoms: [
                'Irregular purple blotches on leaves',
                'Leaves curl and dry up',
                'Lesions on petioles and fruit stalks',
                'Reduced vigor'
            ],
            treatment: [
                'Fungicides',
                'Remove infected leaves',
                'Renovate beds after harvest'
            ],
            prevention: [
                'Plant resistant varieties',
                'Ensure good drainage',
                'Weed control'
            ],
            season: 'Wet spring and autumn',
            spread: 'Splashing water'
        },
        {
            id: 18,
            name: 'Bacterial Spot',
            scientific: 'Xanthomonas campestris',
            crop: 'Tomato',
            severity: 'Moderate',
            confidence: '95-98%',
            image: 'https://image.pollinations.ai/prompt/tomato%20bacterial%20spot%20leaf',
            symptoms: [
                'Small dark spots on leaves',
                'Scabby spots on fruit',
                'Yellowing and leaf drop',
                'Blossom drop'
            ],
            treatment: [
                'Copper sprays',
                'Remove infected plants',
                'Avoid overhead irrigation'
            ],
            prevention: [
                'Use disease-free seeds',
                'Crop rotation',
                'Mulching'
            ],
            season: 'Warm, wet weather',
            spread: 'Rain splash'
        },
        {
            id: 19,
            name: 'Early Blight',
            scientific: 'Alternaria solani',
            crop: 'Tomato',
            severity: 'Moderate',
            confidence: '90-95%',
            image: 'https://image.pollinations.ai/prompt/tomato%20early%20blight%20leaf%20concentric%20rings',
            symptoms: [
                'Target-like spots on lower leaves',
                'Yellowing around spots',
                'Stem lesions',
                'Fruit rot'
            ],
            treatment: [
                'Fungicides',
                'Stake plants',
                'Mulch to prevent soil splash'
            ],
            prevention: [
                'Crop rotation',
                'Proper spacing',
                'Remove debris'
            ],
            season: 'Warm, humid weather',
            spread: 'Wind and rain'
        },
        {
            id: 20,
            name: 'Late Blight',
            scientific: 'Phytophthora infestans',
            crop: 'Tomato',
            severity: 'Severe',
            confidence: '90-96%',
            image: 'https://image.pollinations.ai/prompt/tomato%20late%20blight%20leaf%20damage',
            symptoms: [
                'Greasy dark spots on leaves',
                'White mold on undersides',
                'Brown firm rot on fruit',
                'Rapid collapse'
            ],
            treatment: [
                'Immediate removal',
                'Preventative fungicides',
                'Avoid overhead watering'
            ],
            prevention: [
                'Resistant varieties',
                'Good airflow',
                'Monitor weather'
            ],
            season: 'Cool, wet weather',
            spread: 'Wind-borne spores'
        },
        {
            id: 21,
            name: 'Leaf Mold',
            scientific: 'Passalora fulva',
            crop: 'Tomato',
            severity: 'Mild',
            confidence: '96-99%',
            image: 'https://image.pollinations.ai/prompt/tomato%20leaf%20mold%20yellow%20spots',
            symptoms: [
                'Yellow spots on upper leaf surface',
                'Olive-green mold on undersides',
                'Leaf curling and death',
                'Blossom drop'
            ],
            treatment: [
                'Fungicides',
                'Reduce humidity',
                'Improve airflow'
            ],
            prevention: [
                'Resistant varieties',
                'Ventilate greenhouses',
                'Avoid wetting leaves'
            ],
            season: 'High humidity',
            spread: 'Wind and air currents'
        },
        {
            id: 22,
            name: 'Septoria Leaf Spot',
            scientific: 'Septoria lycopersici',
            crop: 'Tomato',
            severity: 'Moderate',
            confidence: '88-95%',
            image: 'https://image.pollinations.ai/prompt/tomato%20septoria%20leaf%20spot',
            symptoms: [
                'Small circular spots with gray centers',
                'Dark borders around spots',
                'Lower leaves affected first',
                'Defoliation'
            ],
            treatment: [
                'Fungicides',
                'Remove lower leaves',
                'Mulch'
            ],
            prevention: [
                'Crop rotation',
                'Weed control',
                'Sanitation'
            ],
            season: 'Wet weather',
            spread: 'Splashing water'
        },
        {
            id: 23,
            name: 'Spider Mites',
            scientific: 'Tetranychus urticae',
            crop: 'Tomato',
            severity: 'Moderate',
            confidence: '85-92%',
            image: 'https://image.pollinations.ai/prompt/spider%20mites%20on%20tomato%20leaf',
            symptoms: [
                'Tiny yellow dots (stippling) on leaves',
                'Fine webbing on plants',
                'Leaves turn bronze or yellow',
                'Plant decline'
            ],
            treatment: [
                'Insecticidal soap',
                'Miticides',
                'Predatory mites'
            ],
            prevention: [
                'Keep plants watered',
                'Avoid dust',
                'Monitor regularly'
            ],
            season: 'Hot, dry weather',
            spread: 'Wind and movement'
        },
        {
            id: 24,
            name: 'Target Spot',
            scientific: 'Corynespora cassiicola',
            crop: 'Tomato',
            severity: 'Moderate',
            confidence: '88-93%',
            image: 'https://image.pollinations.ai/prompt/tomato%20target%20spot%20disease',
            symptoms: [
                'Brown lesions with light centers',
                'Target-like appearance',
                'Fruit lesions with cracking',
                'Leaf drop'
            ],
            treatment: [
                'Fungicides',
                'Improve airflow',
                'Remove infected debris'
            ],
            prevention: [
                'Resistant varieties',
                'Crop rotation',
                'Avoid overhead watering'
            ],
            season: 'Warm, humid weather',
            spread: 'Wind and rain'
        },
        {
            id: 25,
            name: 'Yellow Leaf Curl Virus',
            scientific: 'TYLCV',
            crop: 'Tomato',
            severity: 'Severe',
            confidence: '98-100%',
            image: 'https://image.pollinations.ai/prompt/tomato%20yellow%20leaf%20curl%20virus',
            symptoms: [
                'Upward curling of leaves',
                'Yellowing of leaf margins',
                'Stunted growth',
                'Flower drop'
            ],
            treatment: [
                'No cure',
                'Remove infected plants',
                'Control whiteflies'
            ],
            prevention: [
                'Resistant varieties',
                'Reflective mulches',
                'Fine mesh screens'
            ],
            season: 'Warm season',
            spread: 'Whiteflies'
        },
        {
            id: 26,
            name: 'Mosaic Virus',
            scientific: 'ToMV',
            crop: 'Tomato',
            severity: 'Moderate',
            confidence: '97-99%',
            image: 'https://image.pollinations.ai/prompt/tomato%20mosaic%20virus%20leaf%20pattern',
            symptoms: [
                'Mottled light and dark green leaves',
                'Fern-like leaf appearance',
                'Stunted fruit with brown spots',
                'Reduced yield'
            ],
            treatment: [
                'No cure',
                'Remove infected plants',
                'Sanitize tools'
            ],
            prevention: [
                'Resistant varieties',
                'Wash hands (tobacco users)',
                'Weed control'
            ],
            season: 'Any time',
            spread: 'Mechanical contact and seeds'
        }
    ];

    const crops = ['All', ...new Set(diseases.map(d => d.crop))];
    const severities = ['All', 'Severe', 'Moderate', 'Mild'];

    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'Severe': return 'bg-red-100 text-red-700 border-red-300';
            case 'Moderate': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
            case 'Mild': return 'bg-green-100 text-green-700 border-green-300';
            default: return 'bg-gray-100 text-gray-700 border-gray-300';
        }
    };

    const filteredDiseases = diseases.filter(disease => {
        const matchesSearch = disease.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            disease.scientific.toLowerCase().includes(searchQuery.toLowerCase()) ||
            disease.crop.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCrop = selectedCrop === 'All' || disease.crop === selectedCrop;
        const matchesSeverity = selectedSeverity === 'All' || disease.severity === selectedSeverity;
        return matchesSearch && matchesCrop && matchesSeverity;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 text-white py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-4">
                        <Leaf size={40} />
                        <h1 className="text-5xl font-bold">Disease Database</h1>
                    </div>
                    <p className="text-xl text-white/90 mb-8">
                        Comprehensive guide to plant diseases detectable by AgriVision AI
                    </p>

                    {/* Search and Filters */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                        <div className="grid md:grid-cols-3 gap-4">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search diseases..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                                />
                            </div>

                            {/* Crop Filter */}
                            <div className="relative">
                                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
                                <select
                                    value={selectedCrop}
                                    onChange={(e) => setSelectedCrop(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/50 appearance-none cursor-pointer"
                                >
                                    {crops.map(crop => (
                                        <option key={crop} value={crop} className="text-gray-900">{crop} Crops</option>
                                    ))}
                                </select>
                            </div>

                            {/* Severity Filter */}
                            <div className="relative">
                                <AlertCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
                                <select
                                    value={selectedSeverity}
                                    onChange={(e) => setSelectedSeverity(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/50 appearance-none cursor-pointer"
                                >
                                    {severities.map(severity => (
                                        <option key={severity} value={severity} className="text-gray-900">{severity} Severity</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="mt-4 text-white/80 text-sm">
                            Showing {filteredDiseases.length} of {diseases.length} diseases
                        </div>
                    </div>
                </div>
            </div>

            {/* Disease Cards Grid */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredDiseases.map((disease) => (
                        <div
                            key={disease.id}
                            className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                        >
                            {/* Disease Image */}
                            <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300">
                                <img
                                    src={disease.image}
                                    alt={disease.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 right-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(disease.severity)}`}>
                                        {disease.severity}
                                    </span>
                                </div>
                            </div>

                            {/* Disease Info */}
                            <div className="p-6">
                                {/* Header */}
                                <div className="mb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                                            {disease.crop}
                                        </span>
                                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                                            {disease.confidence} Accuracy
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{disease.name}</h3>
                                    <p className="text-sm text-gray-500 italic">{disease.scientific}</p>
                                </div>

                                {/* Symptoms */}
                                <div className="mb-4">
                                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                        Symptoms
                                    </h4>
                                    <ul className="space-y-1">
                                        {disease.symptoms.slice(0, 3).map((symptom, idx) => (
                                            <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                                <span className="text-red-500 mt-1">•</span>
                                                <span>{symptom}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Treatment */}
                                <div className="mb-4">
                                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                        Treatment
                                    </h4>
                                    <ul className="space-y-1">
                                        {disease.treatment.slice(0, 2).map((treat, idx) => (
                                            <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                                <span className="text-green-500 mt-1">•</span>
                                                <span>{treat}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Season & Spread */}
                                <div className="pt-4 border-t border-gray-200">
                                    <div className="mb-2">
                                        <span className="text-xs font-semibold text-gray-700">Season: </span>
                                        <span className="text-xs text-gray-600">{disease.season}</span>
                                    </div>
                                    <div>
                                        <span className="text-xs font-semibold text-gray-700">Spread: </span>
                                        <span className="text-xs text-gray-600">{disease.spread}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredDiseases.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-gray-400 mb-4">
                            <Leaf size={64} className="mx-auto" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-700 mb-2">No diseases found</h3>
                        <p className="text-gray-500">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DiseasesPage;
