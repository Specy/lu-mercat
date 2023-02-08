import { browser } from '$app/environment';
import { createDebouncer } from '$lib/utils';
import { TinyColor } from '@ctrl/tinycolor';

import cloneDeep from 'clone-deep'
import { get, writable } from 'svelte/store'
import type { Writable } from "svelte/store"

const themeObject = {
    background: {
        color: "#EDEDE9",
        name: 'background',
        prop: 'background'
    },
    primary: {
        color: '#D6CCC2',
        name: 'primary',
        prop: 'primary'
    },
    secondary: {
        color: '#d6c5b4',
        name: 'secondary',
        prop: 'secondary'
    },
    tertiary: {
        color: '#1D3557',
        name: 'tertiary',
        prop: 'tertiary'
    },
    accent: {
        color: '#E63946',
        name: 'accent',
        prop: 'accent'
    },
    accent2: {
        color: '#8789C0',
        name: 'accent2',
        prop: 'accent2'
    },

    textDarker: {
        color: '#c1c1c1',
        name: 'text-layered',
        prop: 'textDarker'
    },
    red: {
        color: '#ed4f4f',
        name: 'red', 
        prop: 'red'
    },
    green: {
        color: '#356a59',
        name: 'green',
        prop: 'green'
    }
}
type ThemeKeys = keyof typeof themeObject
export type ThemeProp = {
    name: string
    color: string
    prop: ThemeKeys
}
const version = 1
type StoredTheme = {
    version: number
    theme: ThemeProp[]
}
const [debouncer] = createDebouncer(1000)
export class ThemeStoreClass {
    public textForDark = "#dbdbdb"
    public textForLight = "#181818"
    theme: Writable<{
        [key in ThemeKeys]: Writable<ThemeProp>
    }>
    constructor() {
        const base = cloneDeep(themeObject)
        const listened = {} as { [key in ThemeKeys]: Writable<ThemeProp> }
        Object.entries(base).forEach(([key, value]) => {
            //@ts-ignore doesnt like that i set the key
            listened[key] = writable({
                //@ts-ignore value is an object
                ...value,
                //@ts-ignore value is unknown
                color: value.color
            })
        })
        this.theme = writable(listened)
    }
    toArray(): ThemeProp[] {
        return Object.values(get(this.theme)).map(el => get(el))
    }
    isDefault(key: ThemeKeys, color): boolean {
        return themeObject[key]?.color === color
    }
    reset(key: ThemeKeys) {
        this.set(key, themeObject[key]?.color)

    }
    set(key: ThemeKeys, color: string): void {
        this.theme.update(theme => {
            theme[key].update(themeProp => {
                themeProp.color = color
                return themeProp
            })
            return theme
        })
        this.save()
    }
    get(key: ThemeKeys): Writable<ThemeProp> {
        return get(this.theme)[key]
    }
    getText(key: ThemeKeys): string {
        const color = this.getColor(key)
        return color?.isDark() ? this.textForDark : this.textForLight
    }
    layer(key: ThemeKeys, layer: number): TinyColor {
        const color = this.getColor(key)
        const isDark = color.isDark()
        return isDark ? color.lighten(layer) : color.darken(layer)
    }
    getColor(key: ThemeKeys): TinyColor {
        return new TinyColor(get(this.get(key)).color)
    }
    save() {
        const inner = () => {
            const theme = this.toArray()
            const state: StoredTheme = {
                version: 1,
                theme
            }
            localStorage.setItem('lu_mercat_theme', JSON.stringify(state))
        }
        debouncer(inner)
    }
    load() {
        try {
            const theme = JSON.parse(localStorage.getItem('lu_mercat_theme')) as StoredTheme | null
            if (theme && theme.version === version) {
                theme.theme.forEach((themeProp: ThemeProp) => {
                    this.set(themeProp.prop, themeProp.color)
                })
            }
        } catch (e) {
            console.error(e)
        }

    }
}

export const ThemeStore = new ThemeStoreClass()
if (browser) ThemeStore.load()