use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
#[allow(non_snake_case)]
pub fn calculatePedestrianCalories(biking: bool, weight_range: f64) -> f64 {
    if biking {
        (40. + 5. * weight_range + (60. + 10. * weight_range)) / 2.
    } else {
        55. + weight_range * 5.
    }
}

#[wasm_bindgen]
#[allow(non_snake_case)]
pub fn metersToMiles(meters: f64) -> f64 {
    meters / 1609.34
}

#[wasm_bindgen]
#[allow(non_snake_case)]
pub fn secondsToMinutes(seconds: f64) -> f64 {
    seconds / 60.
}
