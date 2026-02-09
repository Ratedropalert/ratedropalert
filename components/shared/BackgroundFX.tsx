export default function BackgroundFX() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-900 blur-3xl opacity-20" />
      <div className="absolute top-0 -right-4 w-96 h-96 bg-emerald-900 blur-3xl opacity-20" />
      <div className="bg-noise" />
    </div>
  );
}
