import SvgIcon, {SvgIconProps} from "@material-ui/core/SvgIcon";
import { ReactComponent as Icon } from "./RunIcon.svg"



const RunIcon = (props: SvgIconProps) => {
    return (
        <SvgIcon {...props}>
            <Icon/>
        </SvgIcon>
    );
}

export default RunIcon