import { useEffect, useState } from "react";
import { Iversion } from "../../assets/js/mytypes";

export interface IAdvancedMethodsPage {
    title_and_message_update_code: string;
    progress_bar_update_code: string;
    adding_image_code: string;
    channel_management_code: string;
    getting_identifier_code: string;
    custom_sound_code?: string;
    vibrate_code?: string;
    only_alert_once_code?: string;
    obey_user_clear_code?: string;
    is_intray_code?: string;
}

export function useAdvancedMethodsData(version: Iversion): IAdvancedMethodsPage | undefined {
    const [data, setData] = useState<IAdvancedMethodsPage>();

    useEffect(() => {
        let stale = false;
        (async () => {
            const v1 = await import(`./1.58.tsx`);
            const v2 = await import(`./1.59.tsx`);
            const current = await import(`./${version}.tsx`);
            if (stale) return;
            setData({
                ...v1.advanced_methods_page,
                ...v2.advanced_methods_page,
                ...current.advanced_methods_page,
            });
        })();
        return () => {
            stale = true;
        };
    }, [version]);

    return data;
}