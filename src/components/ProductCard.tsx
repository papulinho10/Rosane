import React, { useState } from 'react';
import { Plus, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../data';

interface ProductCardProps {
  product: Product;
  index?: number;
  onAddToCart: (product: Product) => void;
  onQuickOrder: (product: Product) => void;
  onClickCard?: (product: Product) => void;
  onPauseScroller?: () => void;
  isCarouselItem?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickOrder,
  onClickCard,
  onPauseScroller,
  isCarouselItem = false,
}) => {
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPauseScroller) onPauseScroller();
    onAddToCart(product);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleQuick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPauseScroller) onPauseScroller();
    onQuickOrder(product);
  };

  const handleCardClick = () => {
    if (onPauseScroller) onPauseScroller();
    if (onClickCard) {
      onClickCard(product);
    }
  };

  const isFeatured = Boolean(product.isFeatured);

  return (
    <div
      onClick={handleCardClick}
      className={`group relative rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between cursor-pointer ${
        isFeatured
          ? 'bg-gradient-to-b from-[#2b0612] via-[#1f040b] to-[#150207] border-2 border-amber-400/70 hover:border-amber-300 shadow-[0_12px_35px_rgba(245,158,11,0.22),0_10px_30px_rgba(0,0,0,0.85)] hover:shadow-[0_18px_45px_rgba(245,158,11,0.38)] ring-1 ring-amber-400/25'
          : 'bg-[#1e040b]/90 border border-rose-900/50 hover:border-rose-500/70 shadow-xl shadow-black/70 hover:shadow-[0_15px_40px_rgba(225,29,72,0.3)]'
      } ${
        isCarouselItem ? 'w-[280px] sm:w-[320px] flex-shrink-0' : 'w-full'
      }`}
    >
      {/* Top Gold Shimmer Bar for Featured Cravejados */}
      {isFeatured && (
        <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500" />
      )}

      {/* Clean Product Image Container - 1:1 Square Framing with Zero Overlay Text */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#140207]">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          draggable="false"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out select-none pointer-events-none"
        />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Price Side by Side */}
          <div className="flex items-baseline justify-between gap-3 mb-3">
            <h3
              className={`font-serif text-lg sm:text-xl font-semibold transition-colors leading-snug ${
                isFeatured
                  ? 'text-amber-100 group-hover:text-amber-300'
                  : 'text-white group-hover:text-rose-200'
              }`}
            >
              {product.name}
            </h3>

            <span
              className={`font-serif text-base sm:text-lg font-bold shrink-0 tabular-nums ${
                isFeatured ? 'text-amber-300' : 'text-rose-300'
              }`}
            >
              {product.price}
            </span>
          </div>

          <div
            className={`mb-4 rounded-xl p-2.5 text-left border ${
              isFeatured
                ? 'bg-black/45 border-amber-500/30'
                : 'bg-black/35 border-rose-900/50'
            }`}
          >
            <span
              className={`text-[10px] font-bold uppercase tracking-wider block mb-1.5 ${
                isFeatured ? 'text-amber-400' : 'text-rose-400'
              }`}
            >
              Ingredientes &amp; Composição:
            </span>
            <ul className="space-y-1 text-xs text-rose-200/90 font-normal">
              {product.ingredients.map((item, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      isFeatured ? 'bg-amber-400' : 'bg-rose-500'
                    }`}
                  />
                  <span className="truncate">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons - Online Store Direct Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-rose-900/50">
          {/* Adicionar à Sacola (+ Feedback) */}
          <button
            type="button"
            onClick={handleAdd}
            className={`flex-1 h-10 sm:h-11 px-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all duration-300 border ${
              addedAnimation
                ? 'bg-emerald-600 border-emerald-400 text-white scale-98'
                : 'bg-[#280610] hover:bg-[#380816] text-rose-100 hover:text-white border-rose-800/60 hover:border-rose-500/80'
            }`}
            title="Adicionar à sacola de compras"
          >
            {addedAnimation ? (
              <>
                <Check size={15} className="text-white" />
                <span>Adicionado!</span>
              </>
            ) : (
              <>
                <Plus size={15} className="text-rose-400" />
                <span>Adicionar</span>
              </>
            )}
          </button>

          {/* Comprar Agora (Direct to WhatsApp Checkout) */}
          <button
            type="button"
            onClick={handleQuick}
            className="group/btn relative flex-1 h-10 sm:h-11 px-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-[#e11d48] to-rose-600 hover:from-rose-500 hover:to-rose-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all duration-300 shadow-[0_4px_16px_rgba(225,29,72,0.4),inset_0_1px_1.5px_rgba(255,255,255,0.35)] hover:shadow-[0_6px_22px_rgba(244,63,94,0.6)] border border-rose-300/40 overflow-hidden"
          >
            <ShoppingBag size={14} className="text-white shrink-0" />
            <span className="tracking-wide">Comprar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
