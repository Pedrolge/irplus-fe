import SvgIcon, {SvgIconProps} from "@material-ui/core/SvgIcon";
import { ReactComponent as Icon } from "./ModelIcon.svg"



const ModelIcon = (props: SvgIconProps) => {
    return (
        <SvgIcon {...props}>
            <Icon/>
        </SvgIcon>
    );
}

export default ModelIcon