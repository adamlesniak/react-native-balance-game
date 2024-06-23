import { Image, View } from "react-native";

const Background = ({
    skill
}: { skill: string }) =>
    <>
        {(skill === 'wind') && <Image
            style={{ flex: 1, width: undefined, height: undefined }}
            source={{ uri: 'https://storage.googleapis.com/static-assets-lesniak/master-of-balance/wind-bg.png' }}
            resizeMode="repeat"
        />}
        {(skill === 'fire') && <Image
            style={{ flex: 1, width: undefined, height: undefined }}
            source={{ uri: 'https://storage.googleapis.com/static-assets-lesniak/master-of-balance/fire-bg.png' }}
            resizeMode="repeat"
        />}
        {(skill === 'water') && <Image
            style={{ flex: 1, width: undefined, height: undefined }}
            source={{ uri: 'https://storage.googleapis.com/static-assets-lesniak/master-of-balance/water-bg.png' }}
            resizeMode="repeat"
        />}
        {(skill === 'earth') && <Image
            style={{ flex: 1, width: undefined, height: undefined }}
            source={{ uri: 'https://storage.googleapis.com/static-assets-lesniak/master-of-balance/earth-bg.png' }}
            resizeMode="repeat"
        />}
    </>

export default Background;