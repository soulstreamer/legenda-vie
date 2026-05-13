import { ShoppingBag, Plus, Minus, Trash2, Truck } from 'lucide-react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { useCart } from '@/context/CartContext';
import { Separator } from '@/components/ui/separator';

export default function CartDrawer() {
  const { items, totalItems, subtotal, shipping, totalPrice, updateQuantity } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative p-2 text-silver hover:text-white transition-colors">
          <ShoppingBag size={20} />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-plum text-white text-[10px] font-bold flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="bg-ink border-l border-[rgba(75,0,130,0.2)] text-white">
        <SheetHeader>
          <SheetTitle className="text-white font-grotesk text-lg flex items-center gap-2">
            <ShoppingBag size={18} className="text-plum" />
            Coș ({totalItems})
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-silver font-grotesk text-sm">
              <ShoppingBag size={40} className="mb-3 opacity-30" />
              Coșul tău este gol
            </div>
          ) : (
            <div className="flex flex-col gap-4 py-4">
              {items.map((item, i) => (
                <div key={`${item.product.id}-${item.size}-${item.color}-${i}`}>
                  <div className="flex gap-3">
                    <div className="w-16 h-16 bg-void rounded flex-shrink-0 overflow-hidden" style={{ border: '1px solid rgba(75,0,130,0.2)' }}>
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-grotesk font-medium text-white text-sm truncate">{item.product.name}</p>
                      <p className="font-mono text-[10px] text-silver">{item.product.price.toFixed(2).replace('.', ',')} Lei</p>
                      {item.size && <p className="font-mono text-[10px] text-silver">Mărime: {item.size}</p>}
                      {item.color && (
                        <div className="flex items-center gap-1 mt-1">
                          <span className="font-mono text-[10px] text-silver">Culoare:</span>
                          <span className="w-3 h-3 rounded-full border border-dim" style={{ background: item.color }} />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.size, item.color)}
                        className="p-1 text-silver hover:text-white transition-colors"
                      >
                        {item.quantity === 1 ? <Trash2 size={14} /> : <Minus size={14} />}
                      </button>
                      <span className="font-mono text-xs text-white w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.size, item.color)}
                        className="p-1 text-silver hover:text-white transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <Separator className="mt-4 bg-[rgba(75,0,130,0.1)]" />
                </div>
              ))}
            </div>
          )}
        </div>

        <SheetFooter className="border-t border-[rgba(75,0,130,0.2)] px-4 py-4">
          <div className="w-full space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-grotesk text-white text-sm">Subtotal</span>
              <span className="font-grotesk text-white">{subtotal.toFixed(2).replace('.', ',')} Lei</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-grotesk text-white text-sm flex items-center gap-1">
                <Truck size={14} className="text-plum" /> Transport
              </span>
              <span className="font-grotesk text-white">{shipping.toFixed(2).replace('.', ',')} Lei</span>
            </div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-plum to-transparent opacity-40" />
            <div className="flex justify-between items-center">
              <span className="font-grotesk text-white text-sm">Total</span>
              <span className="font-grotesk font-semibold text-white">{totalPrice.toFixed(2).replace('.', ',')} Lei</span>
            </div>
            <button className="btn-primary w-full text-sm py-3">
              Finalizează comanda
            </button>
            <SheetClose asChild>
              <button className="w-full text-center font-mono text-[10px] text-silver hover:text-white transition-colors py-2">
                Continuă cumpărăturile
              </button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
