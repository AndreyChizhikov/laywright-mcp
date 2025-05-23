import { test, expect } from '@playwright/test';
import { loginHelper } from '../../helpers/loginHelper';

const BASE_URL = 'https://qauto.forstudy.space/api';
let cookiesValue: string;


test.beforeAll(async () => {
 cookiesValue = `sid=${await loginHelper()}`;
});

test.describe('Cars API Tests', () => {
  
  test('Get Cars - Valid Request', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/cars`, {
      headers: {
        cookie: cookiesValue,
      },
    });

    expect(response.status()).toBe(200);

    // Debugging output to inspect the response
    const responseBody = await response.text();
    console.log('Response Body:', responseBody);

    const responseData = await response.json();
    const cars = responseData.data;

    // Validate that cars is an array
    expect(Array.isArray(cars)).toBeTruthy();

    // Check the length of the array
    expect(cars.length).toBeGreaterThan(0);
  });

  test('Get Cars - Unauthorized Request', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/cars`);
    expect(response.status()).toBe(401);
  });

  test('Add Car - Valid Request', async ({request }) => {
    const newCar = {
      carBrandId: '1',
      carModelId: '1',
      mileage: 122
    };

    const response = await request.post(`${BASE_URL}/cars`, {
      headers: {
        cookie: cookiesValue,
      },
      data:newCar,
    });

    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    const addedCar = responseBody.data;
  
    expect(addedCar).toMatchObject(newCar);
  });

  test('Update Car - Valid Request', async ({ request }) => {
    // First, create a new car to update
    const newCar = {
      carBrandId: '1',
      carModelId: '1',
      mileage: 122
    };

    const createResponse = await request.post(`${BASE_URL}/cars`, {
      headers: {
        cookie: cookiesValue,
      },
      data: newCar,
    });

    expect(createResponse.status()).toBe(201);
    const createResponseData = await createResponse.json();
    const createdCar = createResponseData.data;

    // Use the created car's ID for the update
    const updatedCar = {
      id: createdCar.id,
      carBrandId: '1',
      carModelId: '1',
      mileage: 133
    };

    const updateResponse = await request.put(`${BASE_URL}/cars/${updatedCar.id}`, {
      headers: {
        cookie: cookiesValue,
      },
      data: updatedCar,
    });

    expect(updateResponse.status()).toBe(200);
    const updatedResponse = await updateResponse.json();

    const car = updatedResponse.data;
    expect(car).toMatchObject(updatedCar);
  });

  test('Delete Car - Valid Request', async ({ request }) => {
    // First, create a new car to delete
   const newCar = {
      carBrandId: '1',
      carModelId: '1',
      mileage: 122
    };

    const createResponse = await request.post(`${BASE_URL}/cars`, {
      headers: {
        cookie: cookiesValue,
      },
      data: newCar,
    });

    expect(createResponse.status()).toBe(201);
    const createResponseData = await createResponse.json();
    const createdCar = createResponseData.data;
    
    // Use the created car's ID for deletion
    const deleteResponse = await request.delete(`${BASE_URL}/cars/${createdCar.id}`, {
      headers: {
        cookie: cookiesValue,
      },
    });
    expect(deleteResponse.status()).toBe(200);
  });
});