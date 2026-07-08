/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LeadFormValues {
  name: string;
  email: string;
  businessName: string;
  role: string;
  currentMix: string;
  whatsapp: string;
}

export interface CalculatorState {
  monthlyCustomers: number;
  averageTicket: number;
  estimatedCacaoAdoption: number; // percentage (e.g. 5% to 15% of clients choosing cacao over coffee)
  costPerServing: number;
  pricePerServing: number;
}
