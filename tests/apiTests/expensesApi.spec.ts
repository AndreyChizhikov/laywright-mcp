import { test, expect } from '@playwright/test';
import { loginHelper } from '../../helpers/loginHelper';

const BASE_URL = 'https://qauto.forstudy.space/api';
let cookiesValue: string;


test.beforeAll(async () => {
 cookiesValue = `sid=${await loginHelper()}`;
});

test.describe('Expenses API Tests', () => {

    test('Get Expense - Valid Request', async ({ request }) => {

     //Create a new car   
    const newCar = {
          carBrandId: '1',
          carModelId: '1',
          mileage: 122
        };
    
        const newCarResponse = await request.post(`${BASE_URL}/cars`, {
          headers: {
            cookie: cookiesValue,
          },
          data:newCar,
        });

        expect(newCarResponse.status()).toBe(201);
        const responseBody = await newCarResponse.json();
        const car = responseBody.data;

    //Create a new expense
        const newExpense = await request.post(`${BASE_URL}/expenses`, {
            headers: {
                cookie: cookiesValue,
            },
            data: {
                "carId": `${car.id}`,
                "reportedAt": "2025-05-23",
                "mileage": 1112,
                "liters": 11,
                "totalCost": 11,
                "forceMileage": false
            }
        }); 
        
        expect(newExpense.status()).toBe(200);

        const newExpenseBody = await newExpense.json();
        const newExpenseData = newExpenseBody.data;
      
        newExpenseData.carId = parseInt(newExpenseData.carId);
        
   //  Get expense  
    const response = await request.get(`${BASE_URL}/expenses/${newExpenseData.id}`, {
      headers: {
        cookie: cookiesValue,
      },
    });
    expect(response.status()).toBe(200);
        const responseExpenses = await response.json();
        const expenses = responseExpenses.data;
        console.log('Data', expenses);
    expect(expenses).toMatchObject(newExpenseData);

    });
});