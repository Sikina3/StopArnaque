import React from "react";
import { Button } from "@mui/joy";

function FilePicker({ onFilesSelected }) {
    const handleChange = (e) => {
        const files = Array.from(e.target.files);
        onFilesSelected(files);
    };

    return (
        <>
            <input
                type="file"
                id="file-upload"
                multiple
                style={{ display: "none" }}
                onChange={handleChange}
            />
            <label htmlFor="file-upload">
                <Button component="span" variant="soft">
                    Importer des fichiers
                </Button>
            </label>
        </>
    );
}

export default FilePicker;
