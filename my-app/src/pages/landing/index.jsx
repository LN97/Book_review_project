
export default function WelcomePage () {
    return (
        <div>
            home page
        <h1 className="text-red">
                  hitting port: {process.env.REACT_APP_ENDPOINT}
            </h1>
        </div>
    )
}