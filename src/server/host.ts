 function xhost() {
    const hostlink = (process.env.NODE_ENV === "production")?`https://taradb.vercel.app`:`http://localhost:3000`
    return hostlink;
}

const host = xhost();
export default host;