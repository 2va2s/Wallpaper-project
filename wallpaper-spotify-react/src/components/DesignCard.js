import { useNavigate } from "react-router-dom"

function DesignCard(props) {

    const history = useNavigate()
    const faireRedirection = () => {
        let url = "/data-model"
        history(url, { state: { design: props.design } }
        )
    }
    const design = {
        width: window.screen.width / 3, height: window.screen.height / 3,
    };
    return (
        <div className="design"
            onClick={faireRedirection} style={design}
        >
            {props.name}
        </div>
    )
}

export default DesignCard