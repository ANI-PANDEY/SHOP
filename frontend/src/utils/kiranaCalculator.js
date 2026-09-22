/**
 * Kirana Scale & Custom Rupee Calculator
 * Accurately calculates exact weight (grams/kg), volume (ml/L), or unit count
 * when a customer asks for a specific Rupee amount (e.g., ₹60 worth of Ghee, Oil, Dal, Sugar).
 */

export const calculateQuantityFromRupees = (product, rupeeAmount) => {
  const amount = parseFloat(rupeeAmount);
  if (!product || isNaN(amount) || amount <= 0) {
    return null;
  }

  const basePrice = product.discountPrice > 0 ? product.discountPrice : product.price;

  // Check if product is liquid / volume item
  const isLiquid = 
    product.category === 'drinks' || 
    product.name.toLowerCase().includes('oil') || 
    product.name.toLowerCase().includes('ghee') ||
    product.name.toLowerCase().includes('milk') ||
    product.name.toLowerCase().includes('juice') ||
    (product.weightOptions && product.weightOptions.some(w => w.toLowerCase().includes('l') || w.toLowerCase().includes('ml')));

  // Check if product is solid weight item
  const isWeightItem = 
    product.category === 'staples' || 
    product.subcategory === 'Dry Fruits' || 
    product.name.toLowerCase().includes('dal') ||
    product.name.toLowerCase().includes('badam') ||
    product.name.toLowerCase().includes('kaju') ||
    product.name.toLowerCase().includes('spices') ||
    product.name.toLowerCase().includes('ghee') ||
    product.name.toLowerCase().includes('powder') ||
    product.name.toLowerCase().includes('rice') ||
    product.name.toLowerCase().includes('atta') ||
    product.name.toLowerCase().includes('sugar');

  // Handle 10kg sack rule (e.g. 10kg Arhar Dal @ ₹1420 -> ₹142/kg)
  if (product.name.includes('10kg Bag') || product.name.includes('10kg Sack')) {
    const pricePerKg = basePrice / 10;
    const exactGrams = Math.round((amount / pricePerKg) * 1000);
    const kgPart = Math.floor(exactGrams / 1000);
    const gPart = exactGrams % 1000;
    
    let textEn = `${exactGrams}g (${(exactGrams / 1000).toFixed(3)} kg)`;
    let textHi = `${exactGrams} ग्राम (${(exactGrams / 1000).toFixed(3)} किग्रा)`;
    if (kgPart > 0) {
      textEn = `${kgPart} kg ${gPart}g (${exactGrams}g)`;
      textHi = `${kgPart} किग्रा ${gPart} ग्राम (${exactGrams}g)`;
    }

    return {
      amount,
      exactValue: exactGrams,
      unitType: 'weight',
      displayEn: textEn,
      displayHi: textHi,
      scaleGuideEn: `Set Digital Scale to ${exactGrams}g`,
      scaleGuideHi: `डिजिटल तराजू पर ${exactGrams} ग्राम (${exactGrams}g) तौलें`
    };
  }

  // Handle volume items (ml / Liter)
  if (isLiquid) {
    const exactMl = Math.round((amount / basePrice) * 1000);
    const literPart = Math.floor(exactMl / 1000);
    const mlPart = exactMl % 1000;

    let textEn = `${exactMl} ml`;
    let textHi = `${exactMl} मिलीलीटर (ml)`;
    if (literPart > 0) {
      textEn = `${literPart} L ${mlPart} ml (${exactMl} ml)`;
      textHi = `${literPart} लीटर ${mlPart} ml (${exactMl} ml)`;
    }

    const approxGrams = Math.round(exactMl * 0.92);

    return {
      amount,
      exactValue: exactMl,
      unitType: 'volume',
      displayEn: textEn,
      displayHi: textHi,
      scaleGuideEn: `Measure ${exactMl} ml (or approx ${approxGrams}g weight on scale)`,
      scaleGuideHi: `माप बर्तन में ${exactMl} ml (या तराजू पर ~${approxGrams}g) तौलें`
    };
  }

  // Handle solid weight items (grams / kg)
  if (isWeightItem) {
    const exactGrams = Math.round((amount / basePrice) * 1000);
    const kgPart = Math.floor(exactGrams / 1000);
    const gPart = exactGrams % 1000;

    let textEn = `${exactGrams} grams (${(exactGrams / 1000).toFixed(3)} kg)`;
    let textHi = `${exactGrams} ग्राम (${(exactGrams / 1000).toFixed(3)} किग्रा)`;
    if (kgPart > 0) {
      textEn = `${kgPart} kg ${gPart}g (${exactGrams}g)`;
      textHi = `${kgPart} किग्रा ${gPart} ग्राम (${exactGrams}g)`;
    }

    return {
      amount,
      exactValue: exactGrams,
      unitType: 'weight',
      displayEn: textEn,
      displayHi: textHi,
      scaleGuideEn: `Set Digital Scale to ${exactGrams}g`,
      scaleGuideHi: `डिजिटल तराजू पर ${exactGrams} ग्राम (${exactGrams}g) तौलें`
    };
  }

  // Handle packet / unit count items
  const fullPacks = Math.floor(amount / basePrice);

  return {
    amount,
    exactValue: fullPacks > 0 ? fullPacks : 1,
    unitType: 'packet',
    displayEn: fullPacks > 0 ? `${fullPacks} Packets` : `Custom ₹${amount} Pack`,
    displayHi: fullPacks > 0 ? `${fullPacks} पैकेट` : `₹${amount} का पैकेट`,
    scaleGuideEn: fullPacks > 0 ? `Give ${fullPacks} full packets` : `Give ₹${amount} custom pack`,
    scaleGuideHi: fullPacks > 0 ? `दुकानदार ${fullPacks} पैकेट दें` : `₹${amount} का सामान दें`
  };
};
