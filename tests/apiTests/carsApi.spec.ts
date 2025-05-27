import { test, expect } from '@playwright/test';
import { addCar, deleteCar, getCarsData, updateCar } from '../../apiClient/carEndpoints';
import { API_URLS } from '../../apiClient/utls';
import { NEW_CAR } from '../../testData/cars';
import { request as pwRequest, APIRequestContext } from '@playwright/test';

let apiRequestContext: APIRequestContext;
test.describe('Cars API Tests', () => {
  
  test.beforeAll(async ({ }) => {
  
      apiRequestContext = await pwRequest.newContext();
    const cars = await getCarsData(apiRequestContext);
    if (Array.isArray(cars)) {
      for (const car of cars) {
        await deleteCar(apiRequestContext, car.id);
      }
    }
  })

  test.afterAll(async () => {
  await apiRequestContext.dispose();
  });
  
  test('Get Cars - Valid Request', async ({ }) => {

    await addCar(apiRequestContext, NEW_CAR);
    var cars = await getCarsData(apiRequestContext);

    // Validate that cars is an array
    expect(Array.isArray(cars)).toBeTruthy();

    // Check the length of the array
    expect(cars.length).toBeGreaterThan(0);
  });

  test('Get Cars - Unauthorized Request', async ({ request }) => {
    const response = await request.get(`${API_URLS.BASE_URL}${API_URLS.cars.get}`);
    expect(response.status()).toBe(401);
  });

  test('Add Car - Valid Request', async ({ }) => {
    
    const addedCar =  await addCar(apiRequestContext, NEW_CAR);
    expect(addedCar).toMatchObject(NEW_CAR);
  });

  test('Update Car - Valid Request', async () => {
    // First, create a new car to update

    const createdCar =  await addCar(apiRequestContext, NEW_CAR);

    // Use the created car's ID for the update
    const updatedCar = {
      id: createdCar.id,
      carBrandId: '1',
      carModelId: '1',
      mileage: 133
    };

    const car = await updateCar(apiRequestContext, createdCar.id, updatedCar);
    expect(car).toMatchObject(updatedCar);
  });

  test('Delete Car - Valid Request', async () => {
    // First, create a new car to delete
  
    const createdCar = await addCar(apiRequestContext, NEW_CAR);
   
    // Use the created car's ID for deletion
    await deleteCar(apiRequestContext, createdCar.id);
  });
});