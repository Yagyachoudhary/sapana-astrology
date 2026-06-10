import { notFound } from 'next/navigation';
import { getService } from '@/lib/queries';
import SlotPicker from '@/components/SlotPicker';

export const dynamic = 'force-dynamic';

export default async function PickSlotPage({ params }) {
  const service = await getService(params.serviceId);
  if (!service) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <p className="eyebrow text-center">Step 2 of 3 — pick a slot</p>
      <h1 className="mt-3 text-center text-4xl">{service.name}</h1>
      <p className="mt-3 text-center text-sm text-cocoa-700">
        {service.duration_minutes} minutes · ₹{Number(service.price_inr).toLocaleString('en-IN')}
      </p>
      <SlotPicker service={service} />
    </div>
  );
}
