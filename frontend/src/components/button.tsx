import { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from 'tailwind-variants' ;

const buttonVariants = tv({
    base: 'rounded-lg px-5 font-medium flex items-center justify-center gap-2',

    variants: {
        variant: {
            primary: 'bg-lime-300 text-lime-950 hover:bg-lime-400',
            secondary: 'bg-zinc-800 text-zinc-200  hover:bg-zinc-700',
        },

        size: {
            default: 'py-2',
            full: 'w-full h-11'
        }
    },

    defaultVariants: {
        variant: 'primary',
        size: 'default',
    }
})

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
    children: ReactNode
}
// 'VariantProps' é usado para automatizar a aplicação de variantes, como 'primary' e 'secondary', para os botões. Assim facilitando o uso dessas variantes como props no componente Button sem precisar definir manualmente cada uma delas.

export function Button({ children, variant, size, ...props } : ButtonProps) {
    return (
        <button {...props} className={buttonVariants({ variant, size })}>
            {children}
        </button>
    )
}