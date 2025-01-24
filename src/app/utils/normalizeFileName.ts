export const normalizeFileName = (name: string, club: string, suffix: string) =>
    `${name.replace(/[^a-zA-Z0-9]/g, "_")}_${club.replace(/[^a-zA-Z0-9]/g, "_")}_${suffix}`;