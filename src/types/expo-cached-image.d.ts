declare module 'expo-cached-image' {
    interface CachedImagesProps {
        source?: Object<string | undefined>;
        style: React.CSSProperties;
    }
    class CachedImages extends React.Component<CachedImagesProps> {}

    export default CachedImages;
}