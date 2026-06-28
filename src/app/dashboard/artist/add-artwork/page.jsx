'use client'
import { AddArtData } from '@/lib/api/artist';
import { authClient } from '@/lib/auth-client';
import { imageUpload } from '@/lib/imageUpload';
import { Form, Input, TextArea, Button, Label } from '@heroui/react';

const AddArtworkPage = () => {
    const {data: session} = authClient.useSession();
    const user = session?.user;
    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const image = await imageUpload(data.image)
        const art = {
            ...data,
            image: image.url,
            artist: user?.name,
            artistId: user?.id, 
            createdAt: new Date().toLocaleString(),
        }

        const result = await AddArtData(art);

        if(result){
            e.target.reset();
        }
    };

    return (
        <div className="bg-gray-50/50 py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="w-full bg-white rounded-2xl shadow-sm p-6 sm:p-8">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                        Add New Artwork
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Share your latest masterpiece with the world. Fill in the details below.
                    </p>
                </div>

                {/* HeroUI Form */}
                <Form onSubmit={handleSubmit} className="space-y-6 w-full">

                    {/* Title */}
                    <div className="flex flex-col gap-2">
                        <Label className='text-xl font-bold'>Title</Label>
                        <Input
                            name="title"
                            placeholder="Enter the title of your piece"
                            required
                            className="w-full mt-2 h-11"
                        />
                    </div>

                    {/* Description */}
                    <div className='flex flex-col gap-2'>
                        <Label className='text-xl font-bold mb-2'>Description</Label>
                        <TextArea
                            name="description"
                            placeholder="Tell the story behind this artwork..."
                            required
                            className="h-32 w-full"
                        />
                    </div>

                    {/* Responsive Grid for Price & Category */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        <div className="flex flex-col gap-2">
                            <Label className='text-lg font-semibold mr-2'>Price:</Label>
                            <Input
                                name="price"
                                type="number"
                                placeholder="$ 0.00"
                                required
                                className="w-full h-11"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label className='text-lg font-semibold mr-2'>Category:</Label>
                            <Input
                                name="category"
                                placeholder="e.g., Painting, Digital, Sculpture"
                                required
                                className="w-full h-11"
                            />
                        </div>
                    </div>

                    {/* Image Upload Area */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="image">
                            Product Image
                        </Label>

                        <input
                            id="image"
                            name="image"
                            type="file"
                            accept="image/*"
                            className="w-full rounded-md border p-2"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 w-full pt-4">
                        <Button
                            type="reset"
                            variant="flat"
                            className="w-full sm:w-auto font-medium bg-red-500 text-white"
                        >
                            Reset Form
                        </Button>
                        <Button
                            type="submit"
                            color="primary"
                            className="w-full sm:w-auto font-medium shadow-sm shadow-primary/20"
                        >
                            Add Artwork
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default AddArtworkPage;