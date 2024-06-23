import Skill from "./Skill";

const SkillPicker = ({
    onSkillPick
}: { onSkillPick: (title: string) => void }) => {

    return (
        <>
            <Skill imageOffset={{ x: 0, y: 0 }} imageUri="https://storage.googleapis.com/static-assets-lesniak/master-of-balance/water.json" onPress={onSkillPick} title={'water'} size={[82, 82]} x={'75%'} y={'76%'} />
            <Skill imageOffset={{ x: -10, y: 0 }} imageUri="https://storage.googleapis.com/static-assets-lesniak/master-of-balance/pointer-fire-animation.json" onPress={onSkillPick} title={'fire'} size={[82, 82]} x={'75%'} y={'87%'} />
            <Skill imageOffset={{ x: 0, y: 0 }} imageUri="https://storage.googleapis.com/static-assets-lesniak/master-of-balance/wind.json" onPress={onSkillPick} title={'wind'} size={[82, 82]} x={'55%'} y={'82%'} />
            <Skill imageOffset={{ x: 0, y: 0 }} imageUri="https://storage.googleapis.com/static-assets-lesniak/master-of-balance/earths.json" onPress={onSkillPick} title={'earth'} size={[82, 82]} x={'54%'} y={'71.5%'} />
        </>
    );
}

export default SkillPicker;