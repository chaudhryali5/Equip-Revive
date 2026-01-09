import { useState, useContext } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import toast from "react-hot-toast"
import { ADD_SERVICE } from "@/resources/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
    FiUploadCloud,
    FiImage,
    FiDollarSign,
    FiTag,
    FiFileText,
    FiPackage,
    FiCheck,
    FiX
} from "react-icons/fi"
import { BiLoaderAlt } from "react-icons/bi"
import { AdminContext } from "@/AdminContext"

const AddService = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const [selectedImage, setSelectedImage] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const { token } = useContext(AdminContext)

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            if (file.type.startsWith('image/')) {
                setSelectedImage(URL.createObjectURL(file))
            } else {
                toast.error("Please upload an image file")
            }
        }
    }

    const removeImage = () => {
        setSelectedImage(null)
        document.getElementById('image-input').value = ''
    }

    const onSubmit = async (data) => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("name", data.name)
            formData.append("price", data.price)
            formData.append("category", data.category)
            formData.append("description", data.description)

            if (data.image?.[0]) {
                formData.append("image", data.image[0])
            }

            const response = await axios.post(ADD_SERVICE, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    token: token
                },
            })

            if (response.data.status) {
                toast.success(response.data.message)
                reset()
                setSelectedImage(null)
            } else {
                toast.error(response.data.message)
            }
        } catch (err) {
            console.error(err)
            toast.error(err.response?.data?.message || "Something went wrong!")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
            <div className="max-w-full sm:max-w-xl md:max-w-2xl mx-auto">

                <div className="mb-6 text-center sm:text-left">
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
                        Add New Service
                    </h1>
                    <p className="text-sm sm:text-base text-slate-600">
                        Create and publish a new service to your catalog
                    </p>
                </div>
                <Card className="shadow-md border-slate-200">
                    <CardHeader className="border-b border-slate-100 pb-4">
                        <CardTitle className="text-lg sm:text-xl font-semibold text-slate-800">
                            Service Details
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="image-input" className="text-slate-700 font-medium flex items-center gap-2 text-sm">
                                    <FiImage className="w-4 h-4" />
                                    Service Image
                                </Label>

                                <div className="relative border-2 border-dashed rounded-lg border-slate-300 hover:border-blue-400 transition-colors overflow-hidden">
                                    {selectedImage ? (
                                        <div className="relative group">
                                            <img
                                                src={selectedImage}
                                                alt="Preview"
                                                className="w-full h-auto max-h-52 object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Button
                                                    type="button"
                                                    onClick={removeImage}
                                                    variant="destructive"
                                                    size="sm"
                                                    className="gap-2"
                                                >
                                                    <FiX className="w-4 h-4" />
                                                    Remove
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <label
                                            htmlFor="image-input"
                                            className="flex flex-col items-center justify-center p-8 cursor-pointer"
                                        >
                                            <FiUploadCloud className="w-12 h-12 text-blue-600 mb-2" />
                                            <p className="text-slate-700 font-medium text-sm mb-1">
                                                Click to upload image
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                PNG, JPG, GIF up to 10MB
                                            </p>
                                        </label>
                                    )}

                                    <Input
                                        id="image-input"
                                        type="file"
                                        accept="image/*"
                                        {...register("image", {
                                            required: "Service image is required",
                                            onChange: (e) => handleImageChange(e)
                                        })}
                                        className="hidden"
                                    />
                                </div>
                                {errors.image && (
                                    <p className="text-sm text-red-500 flex items-center gap-1">
                                        <FiX className="w-3 h-3" />
                                        {errors.image.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-slate-700 font-medium flex items-center gap-2 text-sm">
                                    <FiPackage className="w-4 h-4" />
                                    Service Name
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="e.g., Premium Car Wash"
                                    {...register("name", { required: "Service name is required" })}
                                    className="w-full"
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500 flex items-center gap-1">
                                        <FiX className="w-3 h-3" />
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row sm:gap-4 gap-3">
                                <div className="w-full space-y-2">
                                    <Label htmlFor="price" className="text-slate-700 font-medium flex items-center gap-2 text-sm">
                                        <FiDollarSign className="w-4 h-4" />
                                        Price Range
                                    </Label>
                                    <Input
                                        id="price"
                                        type="text"
                                        placeholder="e.g., $50-$100"
                                        {...register("price", { required: "Price range is required" })}
                                        className="w-full"
                                    />
                                    {errors.price && (
                                        <p className="text-sm text-red-500 flex items-center gap-1">
                                            <FiX className="w-3 h-3" />
                                            {errors.price.message}
                                        </p>
                                    )}
                                </div>

                                <div className="w-full space-y-2">
                                    <Label htmlFor="category" className="text-slate-700 font-medium flex items-center gap-2 text-sm">
                                        <FiTag className="w-4 h-4" />
                                        Category
                                    </Label>
                                    <select
                                        id="category"
                                        {...register("category", { required: "Category is required" })}
                                        className="w-full rounded-md border px-3 py-2 text-sm"
                                    >
                                        <option value="">Select a category</option>
                                        <option value="Automobile">Automobile</option>
                                        <option value="Home Appliances">Home Appliances</option>
                                        <option value="Tech">Tech</option>
                                    </select>
                                    {errors.category && (
                                        <p className="text-sm text-red-500 flex items-center gap-1">
                                            <FiX className="w-3 h-3" />
                                            {errors.category.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-slate-700 font-medium flex items-center gap-2 text-sm">
                                    <FiFileText className="w-4 h-4" />
                                    Description
                                </Label>
                                <Textarea
                                    id="description"
                                    placeholder="Describe your service in detail..."
                                    rows={4}
                                    {...register("description", {
                                        required: "Description is required",
                                        minLength: { value: 10, message: "Description must be at least 10 characters" }
                                    })}
                                    className="w-full resize-none"
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-500 flex items-center gap-1">
                                        <FiX className="w-3 h-3" />
                                        {errors.description.message}
                                    </p>
                                )}
                            </div>

                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-black hover:bg-black/80 text-white font-semibold py-4 sm:py-5"
                                >
                                    {isLoading ? (
                                        <span className="flex items-center gap-2">
                                            <BiLoaderAlt className="w-5 h-5 animate-spin" />
                                            Adding Service...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <FiCheck className="w-5 h-5" />
                                            Add Service
                                        </span>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default AddService
