import { Navigate, Route, Routes } from 'react-router-dom';
import { EstimatePricePage } from '@/features/pricing/ui/EstimatePricePage';
import { EstimateWorkPage } from '@/features/pricing/ui/EstimateWorkPage';
import { EvaluatePricePage } from '@/features/pricing/ui/EvaluatePricePage';
import { PricingHomePage } from '@/features/pricing/ui/PricingHomePage';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<PricingHomePage />} />
      <Route path="/estimar" element={<EstimatePricePage />} />
      <Route path="/evaluar" element={<EvaluatePricePage />} />
      <Route path="/trabajo" element={<EstimateWorkPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
