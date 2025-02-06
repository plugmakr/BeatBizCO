export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      artist_profiles: {
        Row: {
          bio: string | null
          created_at: string
          id: string
          name: string | null
          preferences: Json | null
          social_links: Json | null
          updated_at: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          id: string
          name?: string | null
          preferences?: Json | null
          social_links?: Json | null
          updated_at?: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          id?: string
          name?: string | null
          preferences?: Json | null
          social_links?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      beats: {
        Row: {
          audio_url: string | null
          bpm: number | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_public: boolean | null
          key: string | null
          producer_id: string | null
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          audio_url?: string | null
          bpm?: number | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_public?: boolean | null
          key?: string | null
          producer_id?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          audio_url?: string | null
          bpm?: number | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_public?: boolean | null
          key?: string | null
          producer_id?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "beats_producer_id_fkey"
            columns: ["producer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      buyer_profiles: {
        Row: {
          created_at: string
          id: string
          preferences: Json | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          preferences?: Json | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          preferences?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      client_files: {
        Row: {
          client_id: string | null
          created_at: string
          display_name: string | null
          file_name: string
          file_path: string | null
          file_type: string
          id: string
          parent_id: string | null
          size: number
          type: string
          updated_at: string
          uploaded_by: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          display_name?: string | null
          file_name: string
          file_path?: string | null
          file_type: string
          id?: string
          parent_id?: string | null
          size: number
          type: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string
          display_name?: string | null
          file_name?: string
          file_path?: string | null
          file_type?: string
          id?: string
          parent_id?: string | null
          size?: number
          type?: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_files_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_files_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "client_files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_files_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          budget_range: string | null
          created_at: string
          email: string | null
          genre_focus: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          producer_id: string | null
          project_type: string | null
          social_media: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          budget_range?: string | null
          created_at?: string
          email?: string | null
          genre_focus?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          producer_id?: string | null
          project_type?: string | null
          social_media?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          budget_range?: string | null
          created_at?: string
          email?: string | null
          genre_focus?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          producer_id?: string | null
          project_type?: string | null
          social_media?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clients_producer_id_fkey"
            columns: ["producer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      collaboration_projects: {
        Row: {
          client_id: string | null
          created_at: string
          created_by: string | null
          deadline: string | null
          description: string | null
          id: string
          name: string | null
          settings: Json | null
          status: Database["public"]["Enums"]["project_status"] | null
          title: string
          updated_at: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          created_by?: string | null
          deadline?: string | null
          description?: string | null
          id?: string
          name?: string | null
          settings?: Json | null
          status?: Database["public"]["Enums"]["project_status"] | null
          title: string
          updated_at?: string
        }
        Update: {
          client_id?: string | null
          created_at?: string
          created_by?: string | null
          deadline?: string | null
          description?: string | null
          id?: string
          name?: string | null
          settings?: Json | null
          status?: Database["public"]["Enums"]["project_status"] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "collaboration_projects_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collaboration_projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      funnel_automations: {
        Row: {
          actions: Json | null
          config: Json | null
          created_at: string | null
          funnel_id: string | null
          id: string
          name: string
          trigger_type: string
          updated_at: string | null
        }
        Insert: {
          actions?: Json | null
          config?: Json | null
          created_at?: string | null
          funnel_id?: string | null
          id?: string
          name: string
          trigger_type: string
          updated_at?: string | null
        }
        Update: {
          actions?: Json | null
          config?: Json | null
          created_at?: string | null
          funnel_id?: string | null
          id?: string
          name?: string
          trigger_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "funnel_automations_funnel_id_fkey"
            columns: ["funnel_id"]
            isOneToOne: false
            referencedRelation: "funnels"
            referencedColumns: ["id"]
          },
        ]
      }
      funnel_steps: {
        Row: {
          content: Json | null
          created_at: string | null
          funnel_id: string | null
          id: string
          name: string
          position: number | null
          type: string
          updated_at: string | null
          website_blocks: Json | null
        }
        Insert: {
          content?: Json | null
          created_at?: string | null
          funnel_id?: string | null
          id?: string
          name: string
          position?: number | null
          type: string
          updated_at?: string | null
          website_blocks?: Json | null
        }
        Update: {
          content?: Json | null
          created_at?: string | null
          funnel_id?: string | null
          id?: string
          name?: string
          position?: number | null
          type?: string
          updated_at?: string | null
          website_blocks?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "funnel_steps_funnel_id_fkey"
            columns: ["funnel_id"]
            isOneToOne: false
            referencedRelation: "funnels"
            referencedColumns: ["id"]
          },
        ]
      }
      funnels: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          name: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          name: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          name?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "funnels_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      marketplace_analytics: {
        Row: {
          created_at: string
          event_data: Json | null
          event_type: string
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_data?: Json | null
          event_type: string
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_data?: Json | null
          event_type?: string
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_analytics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      marketplace_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          item_count: number | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          item_count?: number | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          item_count?: number | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      marketplace_items: {
        Row: {
          beat_id: string | null
          bpm: number | null
          category: string | null
          created_at: string
          description: string | null
          genre: string | null
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          key: string | null
          license_type: Database["public"]["Enums"]["license_type"]
          preview_url: string | null
          price: number
          producer_id: string | null
          status: string | null
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          total_downloads: number | null
          total_plays: number | null
          total_sales: number | null
          type: string | null
          updated_at: string
        }
        Insert: {
          beat_id?: string | null
          bpm?: number | null
          category?: string | null
          created_at?: string
          description?: string | null
          genre?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          key?: string | null
          license_type: Database["public"]["Enums"]["license_type"]
          preview_url?: string | null
          price: number
          producer_id?: string | null
          status?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          total_downloads?: number | null
          total_plays?: number | null
          total_sales?: number | null
          type?: string | null
          updated_at?: string
        }
        Update: {
          beat_id?: string | null
          bpm?: number | null
          category?: string | null
          created_at?: string
          description?: string | null
          genre?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          key?: string | null
          license_type?: Database["public"]["Enums"]["license_type"]
          preview_url?: string | null
          price?: number
          producer_id?: string | null
          status?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          total_downloads?: number | null
          total_plays?: number | null
          total_sales?: number | null
          type?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_items_beat_id_fkey"
            columns: ["beat_id"]
            isOneToOne: false
            referencedRelation: "beats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marketplace_items_producer_id_fkey"
            columns: ["producer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      marketplace_sales: {
        Row: {
          amount: number
          buyer_id: string | null
          created_at: string
          id: string
          item_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          amount: number
          buyer_id?: string | null
          created_at?: string
          id?: string
          item_id?: string | null
          status: string
          updated_at?: string
        }
        Update: {
          amount?: number
          buyer_id?: string | null
          created_at?: string
          id?: string
          item_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_sales_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marketplace_sales_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "marketplace_items"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          is_read: boolean | null
          receiver_id: string | null
          sender_id: string | null
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          receiver_id?: string | null
          sender_id?: string | null
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          receiver_id?: string | null
          sender_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      music: {
        Row: {
          artist_id: string | null
          artwork_url: string | null
          audio_url: string | null
          created_at: string
          description: string | null
          genre: string | null
          id: string
          price: number | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          artist_id?: string | null
          artwork_url?: string | null
          audio_url?: string | null
          created_at?: string
          description?: string | null
          genre?: string | null
          id?: string
          price?: number | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          artist_id?: string | null
          artwork_url?: string | null
          audio_url?: string | null
          created_at?: string
          description?: string | null
          genre?: string | null
          id?: string
          price?: number | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          content: string
          created_at: string
          data: Json | null
          id: string
          is_read: boolean | null
          type: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          data?: Json | null
          id?: string
          is_read?: boolean | null
          type: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          data?: Json | null
          id?: string
          is_read?: boolean | null
          type?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      producer_settings: {
        Row: {
          created_at: string
          notification_preferences: Json | null
          producer_id: string
          settings: Json | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          notification_preferences?: Json | null
          producer_id: string
          settings?: Json | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          notification_preferences?: Json | null
          producer_id?: string
          settings?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          bio: string | null
          created_at: string
          full_name: string | null
          id: string
          role: string
          subscription_plan: string | null
          support_tickets: number | null
          updated_at: string
          username: string | null
          website: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          role?: string
          subscription_plan?: string | null
          support_tickets?: number | null
          updated_at?: string
          username?: string | null
          website?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          role?: string
          subscription_plan?: string | null
          support_tickets?: number | null
          updated_at?: string
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      project_collaborators: {
        Row: {
          created_at: string
          permissions: Json | null
          project_id: string
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          permissions?: Json | null
          project_id: string
          role: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          permissions?: Json | null
          project_id?: string
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_collaborators_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "collaboration_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_collaborators_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      project_files: {
        Row: {
          created_at: string
          file_name: string
          file_path: string | null
          file_type: string
          file_url: string
          id: string
          project_id: string | null
          updated_at: string
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string
          file_name: string
          file_path?: string | null
          file_type: string
          file_url: string
          id?: string
          project_id?: string | null
          updated_at?: string
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string
          file_name?: string
          file_path?: string | null
          file_type?: string
          file_url?: string
          id?: string
          project_id?: string | null
          updated_at?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_files_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "collaboration_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_files_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      project_notes: {
        Row: {
          content: string
          created_at: string
          created_by: string | null
          id: string
          project_id: string | null
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          created_by?: string | null
          id?: string
          project_id?: string | null
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          created_by?: string | null
          id?: string
          project_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_notes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_notes_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "collaboration_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          content: string | null
          created_at: string
          id: string
          item_id: string | null
          rating: number
          reviewer_id: string | null
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          item_id?: string | null
          rating: number
          reviewer_id?: string | null
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          item_id?: string | null
          rating?: number
          reviewer_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "marketplace_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sound_library: {
        Row: {
          bpm: number | null
          created_at: string
          description: string | null
          file_path: string | null
          folder_path: string | null
          genre: string | null
          id: string
          is_public: boolean | null
          key: string | null
          name: string | null
          original_filename: string | null
          producer_id: string | null
          size: number | null
          tags: string[] | null
          title: string | null
          type: Database["public"]["Enums"]["sound_type"] | null
          updated_at: string
        }
        Insert: {
          bpm?: number | null
          created_at?: string
          description?: string | null
          file_path?: string | null
          folder_path?: string | null
          genre?: string | null
          id?: string
          is_public?: boolean | null
          key?: string | null
          name?: string | null
          original_filename?: string | null
          producer_id?: string | null
          size?: number | null
          tags?: string[] | null
          title?: string | null
          type?: Database["public"]["Enums"]["sound_type"] | null
          updated_at?: string
        }
        Update: {
          bpm?: number | null
          created_at?: string
          description?: string | null
          file_path?: string | null
          folder_path?: string | null
          genre?: string | null
          id?: string
          is_public?: boolean | null
          key?: string | null
          name?: string | null
          original_filename?: string | null
          producer_id?: string | null
          size?: number | null
          tags?: string[] | null
          title?: string | null
          type?: Database["public"]["Enums"]["sound_type"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sound_library_producer_id_fkey"
            columns: ["producer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sound_library_files: {
        Row: {
          created_at: string
          created_by: string | null
          file_name: string
          file_type: string
          file_url: string
          folder_id: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          file_name: string
          file_type: string
          file_url: string
          folder_id?: string | null
          id?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          file_name?: string
          file_type?: string
          file_url?: string
          folder_id?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sound_library_files_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sound_library_files_folder_id_fkey"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "sound_library_folders"
            referencedColumns: ["id"]
          },
        ]
      }
      sound_library_folders: {
        Row: {
          created_at: string
          id: string
          library_id: string | null
          name: string
          parent_folder_id: string | null
          producer_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          library_id?: string | null
          name: string
          parent_folder_id?: string | null
          producer_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          library_id?: string | null
          name?: string
          parent_folder_id?: string | null
          producer_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sound_library_folders_library_id_fkey"
            columns: ["library_id"]
            isOneToOne: false
            referencedRelation: "sound_library"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sound_library_folders_parent_folder_id_fkey"
            columns: ["parent_folder_id"]
            isOneToOne: false
            referencedRelation: "sound_library_folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sound_library_folders_producer_id_fkey"
            columns: ["producer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sound_library_project_files: {
        Row: {
          created_at: string
          id: string
          project_id: string | null
          sound_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          project_id?: string | null
          sound_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          project_id?: string | null
          sound_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sound_library_project_files_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "collaboration_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sound_library_project_files_sound_id_fkey"
            columns: ["sound_id"]
            isOneToOne: false
            referencedRelation: "sound_library"
            referencedColumns: ["id"]
          },
        ]
      }
      sound_library_tags: {
        Row: {
          color: string | null
          created_at: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          category: string | null
          created_at: string
          date: string
          description: string | null
          id: string
          producer_id: string | null
          type: string
          updated_at: string
        }
        Insert: {
          amount: number
          category?: string | null
          created_at?: string
          date: string
          description?: string | null
          id?: string
          producer_id?: string | null
          type: string
          updated_at?: string
        }
        Update: {
          amount?: number
          category?: string | null
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          producer_id?: string | null
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_producer_id_fkey"
            columns: ["producer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      artist_stats: {
        Row: {
          active_projects: number | null
          artist_id: string | null
          collaborations: number | null
          purchased_beats: number | null
          released_tracks: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      is_admin: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      license_type: "basic" | "premium" | "exclusive"
      project_status: "draft" | "in_progress" | "completed" | "archived"
      sound_type:
        | "beat"
        | "sound_kit"
        | "midi_kit"
        | "loop_kit"
        | "drum_kit"
        | "one_shot"
        | "sample"
      user_role: "guest" | "artist" | "producer" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
