import supabase from '../db/supabase';

export const uploadFileToStorage = async (
    file: File,
    bucketName: string,
    path: string
): Promise<{ url: string; error: string | null }> => {
    try {
        // Generate unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${path}/${fileName}`;

        const { error } = await supabase.storage
            .from(bucketName)
            .upload(filePath, file);

        if (error) {
            console.error('Upload error:', error);
            return { url: '', error: error.message };
        }

        // Get public URL
        const { data: urlData } = supabase.storage
            .from(bucketName)
            .getPublicUrl(filePath);

        return { url: urlData.publicUrl, error: null };
    } catch (error) {
        console.error('Storage error:', error);
        return { url: '', error: 'Failed to upload file' };
    }
};