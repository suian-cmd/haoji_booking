import {useEffect, useState} from "react";
import defaultTagsList from "../common/defaultTagsList";
import useUpdate from "./useUpdate";
import createId from "../common/createId";

const useTags = () => {
    const [tags, setTags] = useState<{id: number, name: string,
        iconName: string, mold: string}[]>([])

    useEffect(() => {
        let localTags = JSON.parse(window.localStorage.getItem('tags') || '[]')
        if(localTags.length === 0){
            localTags = defaultTagsList()
        }
        setTags(localTags)
    }, [])

    useUpdate(() => {
        window.localStorage.setItem('tags', JSON.stringify(tags))
    },[tags])

    // 根据 id 返回标签
    const findTag = (id: number) =>tags.filter(tag => tag.id === id)[0]

    // 根据 id 返回标签下标
    const findIndex = (id: number) => {
        let result = -1
        for (let i = 0; i < tags.length; i++){
            if(tags[i].id === id){
                result = i
                break
            }
        }
        return result
    }

    // 修改标签
    const updateTag = (id:number, obj: {name: string,
        iconName: string}, mold: string) => {
        setTags(tags.map(tag => tag.id === id ? {id : id, name : obj.name,
            iconName : obj.iconName, mold:mold} : tag))
    }
    // 删除标签
    const deleteTag = (id: number) => {
        setTags(tags.filter(tag => tag.id !== id))

    }
    // 添加标签
    const addTag = (name: string, iconName: string, mold: string) => {
        if(name !== null && name !== ''){
            setTags([...tags, {id: createId(), name, iconName, mold}])
        }
    }
    // 获取该标签的名字
    const getName = (id: number) => {
        const tag = tags.filter(tag => tag.id === id)[0]
        return tag? tag.name : '已删'
    }
    // 获取该标签的图标名
    const getIcon = (id: number) => {
        const tag = tags.filter(tag => tag.id === id)[0]
        return tag ? tag.iconName : '9999'
    }

    return {tags, setTags, findTag, findIndex, updateTag,
        deleteTag, addTag, getName, getIcon}
}

export default useTags