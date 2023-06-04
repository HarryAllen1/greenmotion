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

#[wasm_bindgen]
#[allow(non_snake_case)]
pub fn calculateEmissions(gallons: f64) -> f64 {
    8.887 * gallons
}

#[wasm_bindgen]
#[allow(non_snake_case)]
pub fn calculateCarJoules(vehicle_distance: f64) -> f64 {
    1200. * vehicle_distance * 4.184
}

#[wasm_bindgen]
#[allow(non_snake_case)]
pub fn calculateWastedJoules(car_joules: f64, pedestrian_calories: f64) -> f64 {
    car_joules - pedestrian_calories * 4.184
}

#[wasm_bindgen]
#[allow(non_snake_case)]
pub fn calculateGallons(vehicle_distance: f64, mpg: f64) -> f64 {
    vehicle_distance / mpg
}
