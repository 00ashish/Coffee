interface ConfirmationProps {
  onContinueShopping: () => void;
}

export default function Confirmation({ onContinueShopping }: ConfirmationProps) {
  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
      {/* Success Icon */}
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center shadow-xl shadow-amber-900/30">
        <svg className="w-10 h-10 text-amber-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="font-serif text-3xl sm:text-4xl text-amber-50 mb-4">Order Confirmed!</h1>
      <p className="text-amber-300/70 text-lg mb-2">Thank you for your purchase.</p>
      <p className="text-amber-500/60 text-sm mb-8">
        A confirmation email has been sent. Your exceptional coffees are being prepared with care and will be on their way shortly.
      </p>

      {/* Order details */}
      <div className="bg-stone-800/40 rounded-2xl p-6 border border-amber-900/15 mb-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-amber-400 text-sm font-medium">Order #EB-{Math.floor(Math.random() * 90000) + 10000}</span>
        </div>
        <p className="text-amber-600 text-xs">Estimated delivery: 3-5 business days</p>
      </div>

      <button
        onClick={onContinueShopping}
        className="px-8 py-3 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white font-medium rounded-full shadow-lg shadow-amber-900/30 transition-all duration-300 hover:scale-105"
      >
        Continue Shopping
      </button>
    </div>
  );
}
